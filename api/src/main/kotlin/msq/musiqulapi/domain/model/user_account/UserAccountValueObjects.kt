package msq.musiqulapi.domain.model.user_account

import java.util.UUID

@JvmInline
value class UserAccountId private constructor(val value: UUID) {
  companion object {
    fun from(id: UUID): UserAccountId = UserAccountId(id)
  }
}

@JvmInline
value class Email(val value: String) {
  init {
    require(value.contains('@')) { "Invalid email format" }
    require(value.length <= 255) { "Email must be 255 characters or less" }
  }
}

@JvmInline
value class PasswordHash(val value: String)
