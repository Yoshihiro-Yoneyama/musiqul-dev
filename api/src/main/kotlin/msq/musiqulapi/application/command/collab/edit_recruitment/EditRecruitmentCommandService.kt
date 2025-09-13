package msq.musiqulapi.application.command.collab.edit_recruitment

import msq.musiqulapi.application.command.collab.recruit.RecruitCommandInput.*
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentRepository
import msq.musiqulapi.lib.IdFactory
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class EditRecruitmentCommandService(
  val domainEventFactory: IdFactory<DomainEventId>,
  val repository: RecruitmentRepository,
  // TODO Implement domain event
) {
  fun editRecruitment(input: EditRecruitmentCommandInput): EditRecruitmentOutput {
    // TODO Implement edit recruitment command
    return EditRecruitmentOutput(input.id)
  }
}

data class EditRecruitmentCommandInput(
  val id: UUID,
  val ownerInstruments: List<InstrumentType>,
  val songTitle: String,
  val artist: String,
  val name: String,
  val genre: List<MusicGenreType>,
  val deadline: Instant,
  val requiredGenerations: Set<RequiredGenerationType>,
  val requiredGenders: Set<RequiredGenderType>,
  val recruitedInstruments: Map<InstrumentType, Short>,
  val memo: String,
)

data class EditRecruitmentOutput(val id: UUID)
