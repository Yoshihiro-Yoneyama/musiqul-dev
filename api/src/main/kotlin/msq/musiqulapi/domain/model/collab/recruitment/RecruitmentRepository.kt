package msq.musiqulapi.domain.model.collab.recruitment

import arrow.core.Option

interface RecruitmentRepository {
  fun save(recruitment: Recruitment)
  fun findById(recruitmentId: RecruitmentId): Option<Recruitment>
}