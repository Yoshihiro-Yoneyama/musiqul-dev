package msq.musiqulapi.infrastructure.command.player_account

import msq.musiqulapi.domain.model.player_account.Email
import msq.musiqulapi.domain.model.player_account.PasswordHash
import msq.musiqulapi.domain.model.player_account.PlayerAccount
import msq.musiqulapi.domain.model.player_account.PlayerAccountId
import msq.musiqulapi.domain.model.player_account.PlayerAccountRepository
import msq.musiqulapi.infrastructure.mapper.command.player_account.PlayerAccountMapper
import org.springframework.stereotype.Repository

@Repository
class PlayerAccountRepositoryImpl(private val playerAccountMapper: PlayerAccountMapper) :
  PlayerAccountRepository {

  override fun findByEmail(email: Email): PlayerAccount? =
    playerAccountMapper.findByEmail(email.value)?.let {
      PlayerAccount.reconstruct(
        id = PlayerAccountId.from(it.playerId),
        email = Email(it.email),
        passwordHash = PasswordHash(it.passwordHash),
      )
    }
}
