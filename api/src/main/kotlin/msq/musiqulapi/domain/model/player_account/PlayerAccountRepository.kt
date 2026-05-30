package msq.musiqulapi.domain.model.player_account

interface PlayerAccountRepository {
  fun findByEmail(email: Email): PlayerAccount?
}
