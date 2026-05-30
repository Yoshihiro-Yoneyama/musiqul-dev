package msq.musiqulapi.domain.model.user_account

interface UserAccountRepository {
  fun findByEmail(email: Email): UserAccount?
}
