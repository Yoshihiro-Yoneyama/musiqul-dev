package msq.musiqulapi.infrastructure.command.collab.recruit

import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.infrastructure.mapper.collab.recruitment.RecruitmentRecord
import nu.studer.sample.enums.*
import nu.studer.sample.tables.references.RECRUITMENT_MUSIC_GENRE
import nu.studer.sample.tables.references.RECRUITMENT_OWNER_INSTRUMENT
import nu.studer.sample.tables.references.RECRUITMENT_RECRUITED_INSTRUMENT
import nu.studer.sample.tables.references.RECRUITMENT_REQUIRED_GENERATION
import org.jooq.DSLContext
import org.jooq.Record2
import org.jooq.Record3
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@Component
class RecruitmentTranslator(
  private val dslContext: DSLContext,
) {
  fun toRecruitmentRecord(recruitment: Recruitment): RecruitmentRecord {
    return RecruitmentRecord(
      recruitment.id.value,
      recruitment.name.value,
      recruitment.owner.value,
      recruitment.songTitle.value,
      recruitment.artist.value,
      when (recruitment.requiredGender) {
        RequiredGender.MALE_ONLY -> GenderType.MALE_ONLY
        RequiredGender.FEMALE_ONLY -> GenderType.FEMALE_ONLY
        RequiredGender.ALL -> GenderType.ALL
      },
      LocalDateTime.ofInstant(recruitment.deadline.value, ZoneId.of("UTC")),
      recruitment.memo.value,
      when (recruitment.recruitmentStatus) {
        RecruitmentStatus.OPEN -> RecruitmentStatusType.OPEN
        RecruitmentStatus.CLOSE -> RecruitmentStatusType.CLOSE
      },
      recruitment.deleted
    )
  }

  fun toRecruitmentMusicGenreRecord(recruitment: Recruitment): List<Record2<UUID?, MusicGenreType?>> {
    return recruitment.genre.map { r ->
      val genre = when (r) {
        MusicGenre.ROCK -> MusicGenreType.ROCK
        MusicGenre.J_POP -> MusicGenreType.J_POP
        MusicGenre.ANIME -> MusicGenreType.ANIME
        MusicGenre.JAZZ -> MusicGenreType.JAZZ
        MusicGenre.CLASSIC -> MusicGenreType.CLASSIC
        MusicGenre.METAL -> MusicGenreType.METAL
        MusicGenre.OTHER -> MusicGenreType.OTHER
      }
      val record = dslContext.newRecord(RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID, RECRUITMENT_MUSIC_GENRE.GENRE)
      record.set(RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_MUSIC_GENRE.GENRE, genre)
      record
    }
  }

  fun toRecruitmentOwnerInstrumentRecord(recruitment: Recruitment): List<Record2<UUID?, InstrumentType?>> {
    return recruitment.ownerInstruments.map { r ->
      val instrument = when (r) {
        Instrument.VOCAL -> InstrumentType.VOCAL
        Instrument.GITTER -> InstrumentType.GITTER
        Instrument.ELECTRIC_BASE -> InstrumentType.ELECTRIC_BASE
        Instrument.DRUM -> InstrumentType.DRUM
        Instrument.KEY_BOARD -> InstrumentType.KEY_BOARD
        Instrument.PIANO -> InstrumentType.PIANO
        Instrument.VIOLIN -> InstrumentType.VIOLIN
        Instrument.OTHER -> InstrumentType.OTHER
      }
      val record =
        dslContext.newRecord(RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID, RECRUITMENT_OWNER_INSTRUMENT.OWNER_INSTRUMENT)
      record.set(RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_OWNER_INSTRUMENT.OWNER_INSTRUMENT, instrument)
      record
    }
  }

  fun toRecruitmentRecruitedInstrumentRecord(recruitment: Recruitment): List<Record3<UUID?, InstrumentType?, Short?>> {
    return recruitment.recruitedInstruments.value.map.entries.map { entry ->
      val instrument = when (entry.key) {
        Instrument.VOCAL -> InstrumentType.VOCAL
        Instrument.GITTER -> InstrumentType.GITTER
        Instrument.ELECTRIC_BASE -> InstrumentType.ELECTRIC_BASE
        Instrument.DRUM -> InstrumentType.DRUM
        Instrument.KEY_BOARD -> InstrumentType.KEY_BOARD
        Instrument.PIANO -> InstrumentType.PIANO
        Instrument.VIOLIN -> InstrumentType.VIOLIN
        Instrument.OTHER -> InstrumentType.OTHER
      }

      val record = dslContext.newRecord(
        RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID,
        RECRUITMENT_RECRUITED_INSTRUMENT.INSTRUMENT,
        RECRUITMENT_RECRUITED_INSTRUMENT.COUNT
      )
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.INSTRUMENT, instrument)
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.COUNT, entry.value)
      record
    }
  }

  fun toRecruitmentRequiredGenerationRecord(recruitment: Recruitment): List<Record2<UUID?, RequiredGenerationType?>> {
    return recruitment.requiredGenerations.map { r ->
      val generation = when(r) {
        RequiredGeneration.TEEN -> RequiredGenerationType.TEEN
        RequiredGeneration.TWENTIES -> RequiredGenerationType.TWENTIES
        RequiredGeneration.THIRTIES -> RequiredGenerationType.THIRTIES
        RequiredGeneration.FORTIES -> RequiredGenerationType.FORTIES
        RequiredGeneration.FIFTIES -> RequiredGenerationType.FIFTIES
        RequiredGeneration.MORE_THAN_SIXTIES -> RequiredGenerationType.MORE_THAN_SIXTIES
      }

      val record = dslContext.newRecord(RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID, RECRUITMENT_REQUIRED_GENERATION.GENERATION_TYPE)
      record.set(RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_REQUIRED_GENERATION.GENERATION_TYPE, generation)
      record
    }
  }
}