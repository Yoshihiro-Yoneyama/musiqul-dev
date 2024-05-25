package msq.musiqulapi.domain.user;

import lombok.Value

@Value
data class UserName(val value: String) {
  init {
    require(value.length in 1..30) { "User name must be between 1 and 30 characters" }
  }
}
