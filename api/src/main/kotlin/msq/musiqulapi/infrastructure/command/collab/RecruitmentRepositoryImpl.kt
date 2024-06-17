package msq.musiqulapi.infrastructure.command.collab

import arrow.core.Option
import msq.musiqulapi.domain.model.collab.recruitment.Recruitment
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentRepository
import org.springframework.stereotype.Repository

@Repository
class RecruitmentRepositoryImpl: RecruitmentRepository{
  override fun save(recruitment: Recruitment) {
    TODO("Not yet implemented")
  }

  override fun findById(recruitmentId: RecruitmentId): Option<Recruitment> {
    TODO("Not yet implemented")
  }
}