package msq.musiqulapi.infrastructure.command.collab.recruitment

import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.domain.model.util.Gender
import msq.musiqulapi.domain.model.util.Generation
import msq.musiqulapi.domain.model.util.Instrument
import msq.musiqulapi.domain.model.util.MusicGenre
import msq.musiqulapi.infrastructure.mapper.command.collab.recruitment.RecruitmentRecord
import nu.studer.sample.enums.*
import nu.studer.sample.tables.references.*
import org.jooq.DSLContext
import org.jooq.Record2
import org.jooq.Record3
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@Component
class RecruitmentTranslator(private val dslContext: DSLContext) {
  fun toRecruitmentRecord(recruitment: Recruitment): RecruitmentRecord = RecruitmentRecord(
    recruitment.id.value,
    recruitment.name.value,
    recruitment.owner.value,
    recruitment.songTitle.value,
    recruitment.artist.value,
    LocalDateTime.ofInstant(recruitment.deadline.value, ZoneId.of("UTC")),
    recruitment.memo.value,
    when (recruitment.recruitmentStatus) {
      RecruitmentStatus.OPEN -> RecruitmentStatusType.OPEN
      RecruitmentStatus.CLOSE -> RecruitmentStatusType.CLOSE
    },
    recruitment.deleted,
  )

  fun toRecruitmentOwnerInstrumentRecord(
    recruitment: Recruitment,
  ): List<Record2<UUID?, InstrumentType?>> = recruitment.ownerInstruments.map { r ->
    val instrument =
      when (r) {
        Instrument.VOCAL -> InstrumentType.VOCAL
        Instrument.GUITAR -> InstrumentType.GUITAR
        Instrument.ELECTRIC_BASE -> InstrumentType.ELECTRIC_BASE
        Instrument.DRUM -> InstrumentType.DRUM
        Instrument.KEY_BOARD -> InstrumentType.KEY_BOARD
        Instrument.PIANO -> InstrumentType.PIANO
        Instrument.VIOLIN -> InstrumentType.VIOLIN
        Instrument.OTHER -> InstrumentType.OTHER
      }
    val record =
      dslContext.newRecord(
        RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID,
        RECRUITMENT_OWNER_INSTRUMENT.OWNER_INSTRUMENT,
      )
    record.set(RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID, recruitment.id.value)
    record.set(RECRUITMENT_OWNER_INSTRUMENT.OWNER_INSTRUMENT, instrument)
    record
  }

  fun toRecruitmentMusicGenreRecord(
    recruitment: Recruitment,
  ): List<Record2<UUID?, MusicGenreType?>> = recruitment.genres.map { r ->
    val genre =
      when (r) {
        MusicGenre.ROCK -> MusicGenreType.ROCK
        MusicGenre.J_POP -> MusicGenreType.J_POP
        MusicGenre.ANIME -> MusicGenreType.ANIME
        MusicGenre.JAZZ -> MusicGenreType.JAZZ
        MusicGenre.CLASSIC -> MusicGenreType.CLASSIC
        MusicGenre.METAL -> MusicGenreType.METAL
        MusicGenre.OTHER -> MusicGenreType.OTHER
      }
    val record =
      dslContext.newRecord(
        RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID,
        RECRUITMENT_MUSIC_GENRE.GENRE,
      )
    record.set(RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID, recruitment.id.value)
    record.set(RECRUITMENT_MUSIC_GENRE.GENRE, genre)
    record
  }

  fun toRecruitmentRequiredGenerationRecord(
    recruitment: Recruitment,
  ): List<Record2<UUID?, RequiredGenerationType?>> = recruitment.requiredGenerations.map { r ->
    val generation =
      when (r) {
        Generation.TEEN -> RequiredGenerationType.TEEN
        Generation.TWENTIES -> RequiredGenerationType.TWENTIES
        Generation.THIRTIES -> RequiredGenerationType.THIRTIES
        Generation.FORTIES -> RequiredGenerationType.FORTIES
        Generation.FIFTIES -> RequiredGenerationType.FIFTIES
        Generation.MORE_THAN_SIXTIES -> RequiredGenerationType.MORE_THAN_SIXTIES
      }

    val record =
      dslContext.newRecord(
        RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID,
        RECRUITMENT_REQUIRED_GENERATION.GENERATION_TYPE,
      )
    record.set(RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID, recruitment.id.value)
    record.set(RECRUITMENT_REQUIRED_GENERATION.GENERATION_TYPE, generation)
    record
  }

  fun toRequiredGenderType(recruitment: Recruitment): List<Record2<UUID?, RequiredGenderType?>> =
    recruitment.gender.map { r ->
      val gender =
        when (r) {
          Gender.MALE_ONLY -> RequiredGenderType.MALE_ONLY
          Gender.FEMALE_ONLY -> RequiredGenderType.FEMALE_ONLY
          Gender.OTHER -> RequiredGenderType.OTHER
        }
      val record =
        dslContext.newRecord(
          RECRUITMENT_REQUIRED_GENDER.RECRUITMENT_ID,
          RECRUITMENT_REQUIRED_GENDER.REQUIRED_GENDER,
        )
      record.set(RECRUITMENT_REQUIRED_GENDER.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_REQUIRED_GENDER.REQUIRED_GENDER, gender)
      record
    }

  fun toRecruitmentRecruitedInstrumentRecord(
    recruitment: Recruitment,
  ): List<Record3<UUID?, InstrumentType?, Short?>> =
    recruitment.recruitedInstruments.value.map.entries.map { entry ->
      val instrument =
        when (entry.key) {
          Instrument.VOCAL -> InstrumentType.VOCAL
          Instrument.GUITAR -> InstrumentType.GUITAR
          Instrument.ELECTRIC_BASE -> InstrumentType.ELECTRIC_BASE
          Instrument.DRUM -> InstrumentType.DRUM
          Instrument.KEY_BOARD -> InstrumentType.KEY_BOARD
          Instrument.PIANO -> InstrumentType.PIANO
          Instrument.VIOLIN -> InstrumentType.VIOLIN
          Instrument.OTHER -> InstrumentType.OTHER
        }

      val record =
        dslContext.newRecord(
          RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID,
          RECRUITMENT_RECRUITED_INSTRUMENT.INSTRUMENT,
          RECRUITMENT_RECRUITED_INSTRUMENT.COUNT,
        )
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID, recruitment.id.value)
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.INSTRUMENT, instrument)
      record.set(RECRUITMENT_RECRUITED_INSTRUMENT.COUNT, entry.value)
      record
    }
}
