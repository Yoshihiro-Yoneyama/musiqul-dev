package msq.musiqulapi.presentation.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.core.io.buffer.DataBufferUtils
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

/**
 * POST /api/login の JSON ボディ ({loginId, password}) を
 * 未認証の Authentication トークンに変換する。
 * AuthenticationWebFilter がログインエンドポイントの終端でボディを消費するため、
 * ここでリクエストボディを完全に読み切ってよい。
 */
@Component
class LoginAuthenticationConverter(private val objectMapper: ObjectMapper) :
  ServerAuthenticationConverter {

  override fun convert(exchange: ServerWebExchange): Mono<Authentication> = DataBufferUtils
    .join(exchange.request.body)
    .flatMap { dataBuffer ->
      val bytes = ByteArray(dataBuffer.readableByteCount())
      dataBuffer.read(bytes)
      DataBufferUtils.release(dataBuffer)
      val request =
        try {
          objectMapper.readValue(bytes, LoginRequest::class.java)
        } catch (e: Exception) {
          return@flatMap Mono.error<Authentication>(
            BadCredentialsException("Invalid request body"),
          )
        }
      Mono.just(
        UsernamePasswordAuthenticationToken(request.loginId, request.password)
          as Authentication,
      )
    }
}
