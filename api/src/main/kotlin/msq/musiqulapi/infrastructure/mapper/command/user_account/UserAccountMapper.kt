package msq.musiqulapi.infrastructure.mapper.command.user_account

import nu.studer.sample.tables.references.USER_ACCOUNT
import org.jooq.DSLContext
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class UserAccountMapper(private val dslContext: DSLContext) {

  fun findByEmail(email: String): UserAccountRow? = dslContext
    .selectFrom(USER_ACCOUNT)
    .where(USER_ACCOUNT.EMAIL.eq(email))
    .fetchOne()
    ?.let {
      UserAccountRow(
        userId = it[USER_ACCOUNT.USER_ID]!!,
        email = it[USER_ACCOUNT.EMAIL]!!,
        passwordHash = it[USER_ACCOUNT.PASSWORD_HASH]!!,
      )
    }
}

data class UserAccountRow(val userId: UUID, val email: String, val passwordHash: String)
