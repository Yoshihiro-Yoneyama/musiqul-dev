package msq.musiqulapi.infrastructure.command.collab.recruit

import arrow.core.Option
import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.infrastructure.command.collab.recruit.mapper.RecruitmentMapper
import msq.musiqulapi.infrastructure.command.collab.recruit.mapper.RecruitmentRecord
import nu.studer.sample.enums.GenderType
import nu.studer.sample.enums.RecruitmentStatusType
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.time.ZoneId

@Repository
class RecruitmentRepositoryImpl(
  private val recruitmentMapper: RecruitmentMapper
) : RecruitmentRepository {
  override fun save(recruitment: Recruitment) {
    recruitmentMapper.upsert(toRecruitmentRecord(recruitment))
  }

  override fun findById(recruitmentId: RecruitmentId): Option<Recruitment> {
    TODO("Not yet implemented")
  }

  private fun toRecruitmentRecord(recruitment: Recruitment): RecruitmentRecord {
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
}