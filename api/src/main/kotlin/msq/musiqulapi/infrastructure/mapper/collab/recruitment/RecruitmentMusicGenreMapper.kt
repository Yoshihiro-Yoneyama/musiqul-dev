package msq.musiqulapi.infrastructure.mapper.collab.recruitment

import nu.studer.sample.enums.MusicGenreType
import nu.studer.sample.tables.references.RECRUITMENT_MUSIC_GENRE
import org.jooq.DSLContext
import org.jooq.Record2
import org.springframework.stereotype.Component
import java.util.*


@Component
class RecruitmentMusicGenreMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record2<UUID?, MusicGenreType?>>) {
    dslContext.insertInto(
      RECRUITMENT_MUSIC_GENRE,
      RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID,
      RECRUITMENT_MUSIC_GENRE.GENRE,
    )
      .valuesOfRecords(records)
      .execute()
  }

  fun delete(recruitmentId: UUID) {
    dslContext
      .delete(RECRUITMENT_MUSIC_GENRE)
      .where(RECRUITMENT_MUSIC_GENRE.RECRUITMENT_ID.eq(recruitmentId))
      .execute()
  }
}