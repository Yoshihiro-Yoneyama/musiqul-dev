package msq.musiqulapi.application.command.collab.recruitment

import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.player.PlayerId
import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.lib.IdFactory
import msq.musiqulapi.lib.NonEmptyMap
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class RecruitCommandService(
  val domainEventIdFactory: IdFactory<DomainEventId>,
  val recruitmentIdFactory: IdFactory<RecruitmentId>,
  val repository: RecruitmentRepository,
  val eventPublisher: ApplicationEventPublisher
) {
  fun recruit(input: RecruitCommandInput): RecruitCommandOutput {
    val recruitCommand = RecruitCommand(
      RecruitmentName(input.name),
      PlayerId.reconstruct(input.owner),
      input.genre.map { g -> MusicGenre.valueOf(g.name) },
      SongTitle(input.songTitle),
      Artist(input.artist),
      input.ownerInstruments.map { i -> Instrument.valueOf(i.name) },
      RequiredInstrumentsAndCounts(
        NonEmptyMap(
          input.recruitedInstruments.entries.associate { e -> Pair(Instrument.valueOf(e.key.name), e.value) }
        )
      ),
      input.requiredGenerations
        .map { r ->
          when (r) {
            RecruitCommandInput.RequiredGeneration.TEEN -> RequiredGeneration.TEEN
            RecruitCommandInput.RequiredGeneration.TWENTIES -> RequiredGeneration.TWENTIES
            RecruitCommandInput.RequiredGeneration.THIRTIES -> RequiredGeneration.THIRTIES
            RecruitCommandInput.RequiredGeneration.FORTIES -> RequiredGeneration.FORTIES
            RecruitCommandInput.RequiredGeneration.FIFTIES -> RequiredGeneration.FIFTIES
            RecruitCommandInput.RequiredGeneration.MORE_THAN_SIXTIES -> RequiredGeneration.MORE_THAN_SIXTIES
          }
        }
        .toSet(),
      RequiredGender.valueOf(input.requiredGender.name),
      DeadLine(input.deadline),
      Memo(input.memo)
    )
    val recruitment = Recruitment.recruit(
      domainEventIdFactory,
      recruitmentIdFactory,
      recruitCommand
    )
    repository.save(recruitment)
    recruitment.occurredEvents.forEach { e -> eventPublisher.publishEvent(e) }

    return RecruitCommandOutput(recruitment.id.value)
  }
}

data class RecruitCommandInput(
  val name: String,
  val owner: UUID,
  val genre: List<MusicGenreType>,
  val songTitle: String,
  val artist: String,
  val ownerInstruments: List<InstrumentType>,
  val recruitedInstruments: Map<InstrumentType, Int>,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: GenderType,
  val deadline: Instant,
  val memo: String
) {
  enum class MusicGenreType {
    ROCK,
    J_POP,
    ANIME,
    JAZZ,
    CLASSIC,
    METAL,
    OTHER
  }

  enum class InstrumentType {
    VOCAL,
    GITTER,
    ELECTRIC_BASE,
    DRUM,
    KEY_BOARD,
    PIANO,
    VIOLIN,
    OTHER
  }

  enum class RequiredGeneration {
    TEEN,
    TWENTIES,
    THIRTIES,
    FORTIES,
    FIFTIES,
    MORE_THAN_SIXTIES,
  }

  enum class GenderType {
    MALE_ONLY,
    FEMALE_ONLY,
    ALL
  }
}

data class RecruitCommandOutput(val id: UUID)