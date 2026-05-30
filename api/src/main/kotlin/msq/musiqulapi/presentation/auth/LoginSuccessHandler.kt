package msq.musiqulapi.presentation.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.MediaType
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler
import org.springframework.security.web.server.context.ServerSecurityContextRepository
import org.springframework.security.web.server.csrf.CsrfToken
import org.springframework.security.web.server.csrf.ServerCsrfTokenRepository
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

/**
 * ログイン成功時の処理。
 * 1. changeSessionId() でセッション固定攻撃を防ぐ（ログイン前後で ID を変える）
 * 2. 認証済み SecurityContext をセッションへ保存
 * 3. CSRF トークンを取得してセッションへ保存（CsrfWebFilter が管理する遅延トークンを
 *    使うことで、レスポンスで返す値とセッションに保存される値を必ず一致させる）
 * 4. {headerName, token} を JSON で返却
 */
@Component
class LoginSuccessHandler(
  private val securityContextRepository: ServerSecurityContextRepository,
  private val csrfTokenRepository: ServerCsrfTokenRepository,
  private val objectMapper: ObjectMapper,
) : ServerAuthenticationSuccessHandler {

  override fun onAuthenticationSuccess(
    webFilterExchange: WebFilterExchange,
    authentication: Authentication,
  ): Mono<Void> {
    val exchange = webFilterExchange.exchange
    val securityContext = SecurityContextImpl(authentication)

    return exchange.session
      .flatMap { session -> session.changeSessionId() }
      .then(securityContextRepository.save(exchange, securityContext))
      .then(loadCsrfToken(exchange))
      .flatMap { csrfToken -> writeBody(exchange, csrfToken) }
  }

  @Suppress("UNCHECKED_CAST")
  private fun loadCsrfToken(exchange: ServerWebExchange): Mono<CsrfToken> {
    val deferred = exchange.getAttribute<Mono<CsrfToken>>(CsrfToken::class.java.name)
    if (deferred != null) {
      return deferred
    }
    return csrfTokenRepository
      .generateToken(exchange)
      .delayUntil { token -> csrfTokenRepository.saveToken(exchange, token) }
  }

  private fun writeBody(exchange: ServerWebExchange, csrfToken: CsrfToken): Mono<Void> {
    val response = exchange.response
    response.headers.contentType = MediaType.APPLICATION_JSON
    val bytes =
      objectMapper.writeValueAsBytes(
        LoginResponse(csrfToken.headerName, csrfToken.token),
      )
    val buffer = response.bufferFactory().wrap(bytes)
    return response.writeWith(Mono.just(buffer))
  }
}
