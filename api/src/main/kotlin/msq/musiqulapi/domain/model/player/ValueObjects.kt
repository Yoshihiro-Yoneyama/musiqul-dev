package msq.musiqulapi.domain.model.player

import java.util.*

@JvmInline
value class PlayerId private constructor(val value: UUID) {
  companion object {
    fun from(id: UUID): PlayerId = PlayerId(id)
  }
}

@JvmInline
value class PlayerName(val value: String) {
  companion object {
    private const val MAX_LENGTH = 20
  }

  init {
    require(value.length <= MAX_LENGTH) { "Player name must be $MAX_LENGTH characters or less" }
  }
}
