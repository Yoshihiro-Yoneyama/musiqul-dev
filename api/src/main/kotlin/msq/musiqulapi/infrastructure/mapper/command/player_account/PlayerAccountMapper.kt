package msq.musiqulapi.infrastructure.mapper.command.player_account

import nu.studer.sample.tables.references.PLAYER_ACCOUNT
import org.jooq.DSLContext
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class PlayerAccountMapper(private val dslContext: DSLContext) {

  fun findByEmail(email: String): PlayerAccountRow? = dslContext
    .selectFrom(PLAYER_ACCOUNT)
    .where(PLAYER_ACCOUNT.EMAIL.eq(email))
    .fetchOne()
    ?.let {
      PlayerAccountRow(
        playerId = it[PLAYER_ACCOUNT.PLAYER_ID]!!,
        email = it[PLAYER_ACCOUNT.EMAIL]!!,
        passwordHash = it[PLAYER_ACCOUNT.PASSWORD_HASH]!!,
      )
    }
}

data class PlayerAccountRow(val playerId: UUID, val email: String, val passwordHash: String)
