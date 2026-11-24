package msq.musiqulapi.presentation.auth

import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

/**
 * 認証失敗時は 401 を返す。
 * アカウント有無・パスワード不一致・形式不正を区別しない。
 */
@Component
class LoginFailureHandler : ServerAuthenticationFailureHandler {

  override fun onAuthenticationFailure(
    webFilterExchange: WebFilterExchange,
    exception: AuthenticationException,
  ): Mono<Void> {
    val response = webFilterExchange.exchange.response
    response.statusCode = HttpStatus.UNAUTHORIZED
    return response.setComplete()
  }
}
