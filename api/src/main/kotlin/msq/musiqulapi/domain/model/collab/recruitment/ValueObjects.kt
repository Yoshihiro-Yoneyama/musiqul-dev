package msq.musiqulapi.domain.model.collab.recruitment

import arrow.core.Either
import msq.musiqulapi.lib.NonEmptyMap
import msq.musiqulapi.lib.NonEmptyString
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
value class RecruitmentName(val value: String)

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
value class SongTitle(val value: NonEmptyString)

@JvmInline
value class Artist(val value: NonEmptyString)

enum class Instrument {
  VOCAL,
  GITTER,
  ELECTRIC_BASE,
  DRUM,
  KEY_BOARD,
  PIANO,
  VIOLIN,
  OTHER
}

@JvmInline
value class RequiredInstrumentsAndCounts(val value: NonEmptyMap<Instrument, Int>)

@JvmInline
value class RequiredAgeRange private constructor(val value: IntRange) {
  companion object {
    fun create2(value: IntRange): Either<IllegalArgumentException, RequiredAgeRange> {
      return if (value.first < 0 || value.last > 120)
        Either.Left(IllegalArgumentException("age is out of range"))
      else
        Either.Right(RequiredAgeRange(value))
    }

    fun create(value: IntRange): RequiredAgeRange {
      if (value.first < 0 || value.last > 120)
        throw IllegalArgumentException("age is out of range")
      else
        return RequiredAgeRange(value)
    }
  }
}

enum class RequiredGender {
  MALE_ONLY,
  FEMALE_ONLY,
  ALL
}

@JvmInline
value class DeadLine(val value: Instant)

@JvmInline
value class Memo(val value: String)

enum class RecruitmentStatus {
  OPEN,
  CLOSE,
}