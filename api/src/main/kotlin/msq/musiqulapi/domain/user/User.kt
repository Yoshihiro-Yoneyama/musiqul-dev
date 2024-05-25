package msq.musiqulapi.domain.user

import lombok.Value

@Value(staticConstructor = "of")
data class User(
  val userId: UserId,
  val userName: UserName
) {
  companion object {
    fun create(userName: UserName): User {
      return User(
        userId = UserId.generate(),
        userName = userName
      )
    }
  }
}