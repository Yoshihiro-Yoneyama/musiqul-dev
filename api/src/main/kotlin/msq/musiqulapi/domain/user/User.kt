package msq.musiqulapi.domain.user

import lombok.Value

@Value(staticConstructor = "of")
data class User(
  val userId: UserId,
  val displayName: DisplayName,
  val mailAddress: MailAddress,
) {
  companion object {
    fun create(displayName: DisplayName): User {
      return User(
        userId = UserId.generate(),
        displayName = displayName,
        mailAddress = MailAddress(""),
      )
    }
  }
}

