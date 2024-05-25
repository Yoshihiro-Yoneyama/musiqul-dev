package msq.musiqulapi.domain.user

import lombok.Value
import java.util.UUID

@Value(staticConstructor = "of")
data class UserId(val value: String) {
  companion object {
    fun generate(): UserId {
      return UserId(UUID.randomUUID().toString())
    }
  }
}