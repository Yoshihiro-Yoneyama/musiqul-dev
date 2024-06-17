package msq.musiqulapi.domain.model.collab.player

import java.util.*

@JvmInline
value class PlayerId private constructor(val value: UUID) {
  companion object {
    fun reconstruct(id: UUID): PlayerId {
      return PlayerId(id)
    }
  }
}