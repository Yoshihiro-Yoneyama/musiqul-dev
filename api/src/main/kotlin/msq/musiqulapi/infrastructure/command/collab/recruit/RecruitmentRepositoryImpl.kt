package msq.musiqulapi.infrastructure.command.collab.recruit

import arrow.core.Option
import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.infrastructure.command.collab.recruit.mapper.UpsertRecruitmentMapper
import nu.studer.sample.enums.GenderType
import nu.studer.sample.enums.RecruitmentStatusType
import nu.studer.sample.tables.references.RECRUITMENT
import org.jooq.impl.DSL.excluded
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.time.ZoneId

@Repository
class RecruitmentRepositoryImpl(
  private val upsertRecruitmentMapper: UpsertRecruitmentMapper
) : RecruitmentRepository {
  override fun save(recruitment: Recruitment) {
    dslContext.insertInto(
      RECRUITMENT,
      RECRUITMENT.RECRUITMENT_ID,
      RECRUITMENT.NAME,
      RECRUITMENT.OWNER_ID,
      RECRUITMENT.SONG_TITLE,
      RECRUITMENT.ARTIST,
      RECRUITMENT.REQUIRED_AGE_RANGE,
      RECRUITMENT.REQUIRED_GENDER,
      RECRUITMENT.DEADLINE,
      RECRUITMENT.MEMO,
      RECRUITMENT.STATUS,
      RECRUITMENT.DELETED,
    )
      .values(
        recruitment.id.value,
        recruitment.name.value,
        recruitment.owner.value,
        recruitment.songTitle.value,
        recruitment.artist.value,
        recruitment.requiredAgeRange.map { r -> r.value }.getOrNull(),
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
      .onConflict(RECRUITMENT.RECRUITMENT_ID)
      .doUpdate()
      .set(RECRUITMENT.NAME, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.RECRUITMENT_ID, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.NAME, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.OWNER_ID, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.SONG_TITLE, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.ARTIST, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.REQUIRED_AGE_RANGE, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.REQUIRED_GENDER, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.DEADLINE, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.MEMO, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.STATUS, excluded(RECRUITMENT.NAME))
      .set(RECRUITMENT.DELETED, excluded(RECRUITMENT.NAME))
      .execute()
  }

  override fun findById(recruitmentId: RecruitmentId): Option<Recruitment> {
    TODO("Not yet implemented")
  }
}