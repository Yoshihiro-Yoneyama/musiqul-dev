package msq.musiqulapi.infrastructure.command.user_account

import msq.musiqulapi.domain.model.user_account.Email
import msq.musiqulapi.domain.model.user_account.PasswordHash
import msq.musiqulapi.domain.model.user_account.UserAccount
import msq.musiqulapi.domain.model.user_account.UserAccountId
import msq.musiqulapi.domain.model.user_account.UserAccountRepository
import msq.musiqulapi.infrastructure.mapper.command.user_account.UserAccountMapper
import org.springframework.stereotype.Repository

@Repository
class UserAccountRepositoryImpl(private val userAccountMapper: UserAccountMapper) :
  UserAccountRepository {

  override fun findByEmail(email: Email): UserAccount? =
    userAccountMapper.findByEmail(email.value)?.let {
      UserAccount.reconstruct(
        id = UserAccountId.from(it.userId),
        email = Email(it.email),
        passwordHash = PasswordHash(it.passwordHash),
      )
    }
}
