package msq.musiqulapi.infrastructure.command.collab.recruitment

import arrow.core.Either
import msq.musiqulapi.domain.error.NotFound
import msq.musiqulapi.domain.model.collab.recruitment.Recruitment
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentRepository
import msq.musiqulapi.infrastructure.mapper.command.collab.recruitment.*
import org.springframework.stereotype.Repository

@Repository
class RecruitmentRepositoryImpl(
  private val recruitmentTranslator: RecruitmentTranslator,
  private val recruitmentMapper: RecruitmentMapper,
  private val recruitmentOwnerInstrumentMapper: RecruitmentOwnerInstrumentMapper,
  private val recruitmentMusicGenreMapper: RecruitmentMusicGenreMapper,
  private val recruitmentRequiredGenerationMapper: RecruitmentRequiredGenerationMapper,
  private val recruitmentRequiredGenderMapper: RecruitmentRequiredGenderMapper,
  private val recruitmentRecruitedInstrumentMapper: RecruitmentRecruitedInstrumentMapper
) : RecruitmentRepository {
  override fun save(recruitment: Recruitment) {
    recruitmentMapper.upsert(recruitmentTranslator.toRecruitmentRecord(recruitment))
    recruitmentOwnerInstrumentMapper.delete(recruitment.id.value)
    recruitmentOwnerInstrumentMapper.insert(recruitmentTranslator.toRecruitmentOwnerInstrumentRecord(recruitment))
    recruitmentMusicGenreMapper.delete(recruitment.id.value)
    recruitmentMusicGenreMapper.insert(recruitmentTranslator.toRecruitmentMusicGenreRecord(recruitment))
    recruitmentRequiredGenerationMapper.delete(recruitment.id.value)
    recruitmentRequiredGenerationMapper.insert(recruitmentTranslator.toRecruitmentRequiredGenerationRecord(recruitment))
    recruitmentRequiredGenderMapper.delete(recruitment.id.value)
    recruitmentRequiredGenderMapper.insert(recruitmentTranslator.toRequiredGenderType(recruitment))
    recruitmentRecruitedInstrumentMapper.delete(recruitment.id.value)
    recruitmentRecruitedInstrumentMapper.insert(recruitmentTranslator.toRecruitmentRecruitedInstrumentRecord(recruitment))
  }

  override fun findById(recruitmentId: RecruitmentId): Either<NotFound, Recruitment> {
    TODO("Not yet implemented")
  }
}