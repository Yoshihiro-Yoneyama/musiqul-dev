package msq.musiqulapi.domain.model.collab.recruitment

import arrow.core.Either
import msq.musiqulapi.domain.error.NotFound

interface RecruitmentRepository {
  fun save(recruitment: Recruitment)
  fun findById(recruitmentId: RecruitmentId): Either<NotFound, Recruitment>
}
