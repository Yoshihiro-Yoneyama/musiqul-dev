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

@JvmInline
value class NumOfCollabParticipation(val value: Int) {
  init {
    require(value >= 0) { "Number of collab participation must be non-negative" }
  }
}


@JvmInline
value class NumOfFan(val value: Int) {
  init {
    require(value >= 0) { "Number of fans must be non-negative" }
  }
}