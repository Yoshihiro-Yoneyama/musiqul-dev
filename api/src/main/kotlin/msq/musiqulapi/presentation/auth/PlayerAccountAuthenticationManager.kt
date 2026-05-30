package msq.musiqulapi.presentation.auth

import msq.musiqulapi.domain.model.player_account.Email
import msq.musiqulapi.domain.model.player_account.PlayerAccountRepository
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers

/**
 * メールアドレス + パスワードでプレイヤーを認証する。
 * 認証の成否に関わらず BadCredentialsException(401) に集約し、
 * アカウント存在有無を区別させない。
 * JOOQ リポジトリはブロッキングのため boundedElastic で実行する。
 */
@Component
class PlayerAccountAuthenticationManager(
  private val playerAccountRepository: PlayerAccountRepository,
  private val passwordEncoder: PasswordEncoder,
) : ReactiveAuthenticationManager {

  override fun authenticate(authentication: Authentication): Mono<Authentication> = Mono
    .fromCallable {
      val loginId = authentication.principal.toString()
      val rawPassword = authentication.credentials.toString()

      val email =
        try {
          Email(loginId)
        } catch (e: IllegalArgumentException) {
          throw BadCredentialsException("Invalid credentials")
        }

      val account =
        playerAccountRepository.findByEmail(email)
          ?: throw BadCredentialsException("Invalid credentials")

      if (!passwordEncoder.matches(rawPassword, account.passwordHash.value)) {
        throw BadCredentialsException("Invalid credentials")
      }

      UsernamePasswordAuthenticationToken(
        account.id.value.toString(),
        null,
        listOf(SimpleGrantedAuthority("ROLE_USER")),
      ) as Authentication
    }.subscribeOn(Schedulers.boundedElastic())
}
