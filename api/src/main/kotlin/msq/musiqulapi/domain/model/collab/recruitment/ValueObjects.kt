package msq.musiqulapi.domain.model.collab.recruitment

import msq.musiqulapi.lib.NonEmptyMap
import java.time.Instant
import java.util.*

@JvmInline
value class RecruitmentId private constructor(val value: UUID) {
  companion object {
    fun reconstruct(id: UUID): RecruitmentId {
      return RecruitmentId(id)
    }
  }
}

@JvmInline
value class RecruitmentName(val value: String) {
  companion object {
    private const val MAX_LENGTH = 100
  }

  init {
    require(value.length <= MAX_LENGTH) {
      "Recruitment name must be $MAX_LENGTH characters or less"
    }
  }
}

enum class MusicGenre {
  ROCK,
  J_POP,
  ANIME,
  JAZZ,
  CLASSIC,
  METAL,
  OTHER
}

@JvmInline
value class SongTitle(val value: String) {
  companion object {
    private const val MAX_LENGTH = 500
  }

  init {
    require(value.length <= MAX_LENGTH) {
      "Song title must be $MAX_LENGTH characters or less"
    }
  }
}

@JvmInline
value class Artist(val value: String) {
  companion object {
    private const val MAX_LENGTH = 100
  }

  init {
    require(value.length <= MAX_LENGTH) {
      "artist must be $MAX_LENGTH characters or less"
    }
  }
}

enum class Instrument {
  VOCAL,
  GUITAR,
  ELECTRIC_BASE,
  DRUM,
  KEY_BOARD,
  PIANO,
  VIOLIN,
  OTHER
}

@JvmInline
value class RequiredInstrumentsAndCounts(val value: NonEmptyMap<Instrument, Short>)

enum class RequiredGeneration {
  TEEN,
  TWENTIES,
  THIRTIES,
  FORTIES,
  FIFTIES,
  MORE_THAN_SIXTIES,
}

enum class RequiredGender {
  MALE_ONLY,
  FEMALE_ONLY,
  OTHER
}

@JvmInline
value class DeadLine(val value: Instant)

@JvmInline
value class Memo(val value: String) {
  companion object {
    private const val MAX_LENGTH = 2000
  }

  init {
    require(value.length <= MAX_LENGTH) {
      "Memo must be $MAX_LENGTH characters or less"
    }
  }
}

enum class RecruitmentStatus {
  OPEN,
  CLOSE,
}