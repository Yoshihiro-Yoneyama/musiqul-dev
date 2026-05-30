package msq.musiqulapi.domain.model.user_account

sealed interface UserAccount {
  val id: UserAccountId
  val email: Email
  val passwordHash: PasswordHash

  companion object {
    fun reconstruct(id: UserAccountId, email: Email, passwordHash: PasswordHash): UserAccount =
      Data(id, email, passwordHash)
  }

  private data class Data(
    override val id: UserAccountId,
    override val email: Email,
    override val passwordHash: PasswordHash,
  ) : UserAccount
}
