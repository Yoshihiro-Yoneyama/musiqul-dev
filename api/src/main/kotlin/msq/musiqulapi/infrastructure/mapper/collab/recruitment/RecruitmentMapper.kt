package msq.musiqulapi.infrastructure.mapper.collab.recruitment

import nu.studer.sample.enums.GenderType
import nu.studer.sample.enums.RecruitmentStatusType
import nu.studer.sample.tables.references.RECRUITMENT
import org.jooq.DSLContext
import org.jooq.impl.DSL.excluded
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.*

@Component
class RecruitmentMapper(val dslContext: DSLContext) {
  fun upsert(recruitment: RecruitmentRecord) {
    dslContext.insertInto(
      RECRUITMENT,
      RECRUITMENT.RECRUITMENT_ID,
      RECRUITMENT.NAME,
      RECRUITMENT.OWNER_ID,
      RECRUITMENT.SONG_TITLE,
      RECRUITMENT.ARTIST,
      RECRUITMENT.REQUIRED_GENDER,
      RECRUITMENT.DEADLINE,
      RECRUITMENT.MEMO,
      RECRUITMENT.STATUS,
      RECRUITMENT.DELETED,
    )
      .values(
        recruitment.id,
        recruitment.name,
        recruitment.owner,
        recruitment.songTitle,
        recruitment.artist,
        recruitment.requiredGender,
        recruitment.deadline,
        recruitment.memo,
        recruitment.recruitmentStatus,
        recruitment.deleted
      )
      .onConflict(RECRUITMENT.RECRUITMENT_ID)
      .doUpdate()
      .set(RECRUITMENT.NAME, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.OWNER_ID, excluded(RECRUITMENT.OWNER_ID))
      .set(RECRUITMENT.SONG_TITLE, excluded(RECRUITMENT.SONG_TITLE))
      .set(RECRUITMENT.ARTIST, excluded(RECRUITMENT.ARTIST))
      .set(RECRUITMENT.REQUIRED_GENDER, excluded(RECRUITMENT.REQUIRED_GENDER))
      .set(RECRUITMENT.DEADLINE, excluded(RECRUITMENT.DEADLINE))
      .set(RECRUITMENT.MEMO, excluded(RECRUITMENT.MEMO))
      .set(RECRUITMENT.STATUS, excluded(RECRUITMENT.STATUS))
      .set(RECRUITMENT.DELETED, excluded(RECRUITMENT.DELETED))
      .execute()
  }
}

data class RecruitmentRecord(
  val id: UUID,
  val name: String,
  val owner: UUID,
  val songTitle: String,
  val artist: String,
  val requiredGender: GenderType,
  val deadline: LocalDateTime,
  val memo: String,
  val recruitmentStatus: RecruitmentStatusType,
  val deleted: Boolean
)