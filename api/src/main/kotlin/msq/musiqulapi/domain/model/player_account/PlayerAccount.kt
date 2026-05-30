package msq.musiqulapi.domain.model.player_account

sealed interface PlayerAccount {
  val id: PlayerAccountId
  val email: Email
  val passwordHash: PasswordHash

  companion object {
    fun reconstruct(id: PlayerAccountId, email: Email, passwordHash: PasswordHash): PlayerAccount =
      Data(id, email, passwordHash)
  }

  private data class Data(
    override val id: PlayerAccountId,
    override val email: Email,
    override val passwordHash: PasswordHash,
  ) : PlayerAccount
}
