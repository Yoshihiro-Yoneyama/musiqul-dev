package msq.musiqulapi.application.command.collab.recruit

import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.player.PlayerId
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
  // ドメインイベント発行
  val eventPublisher: ApplicationEventPublisher
) {
  fun recruit(input: RecruitCommandInput): RecruitCommandOutput {
    val recruitCommand = RecruitCommand(
      PlayerId.from(input.owner),
      input.ownerInstruments.map { i -> Instrument.valueOf(i.name) },
      SongTitle(input.songTitle),
      Artist(input.artist),
      RecruitmentName(input.name),
      input.genre.map { g -> MusicGenre.valueOf(g.name) },
      DeadLine(input.deadline),
      input.requiredGenerations
        .map { r ->
          when (r) {
            RecruitCommandInput.RequiredGenerationType.TEEN -> RequiredGeneration.TEEN
            RecruitCommandInput.RequiredGenerationType.TWENTIES -> RequiredGeneration.TWENTIES
            RecruitCommandInput.RequiredGenerationType.THIRTIES -> RequiredGeneration.THIRTIES
            RecruitCommandInput.RequiredGenerationType.FORTIES -> RequiredGeneration.FORTIES
            RecruitCommandInput.RequiredGenerationType.FIFTIES -> RequiredGeneration.FIFTIES
            RecruitCommandInput.RequiredGenerationType.MORE_THAN_SIXTIES -> RequiredGeneration.MORE_THAN_SIXTIES
          }
        }
        .toSet(),
      input.requiredGenders.map { gender ->
        when (gender) {
          RecruitCommandInput.RequiredGenderType.MALE_ONLY -> RequiredGender.MALE_ONLY
          RecruitCommandInput.RequiredGenderType.FEMALE_ONLY -> RequiredGender.FEMALE_ONLY
          RecruitCommandInput.RequiredGenderType.OTHER -> RequiredGender.OTHER
        }
      }
        .toSet(),
      RequiredInstrumentsAndCounts(
        NonEmptyMap(
          input.recruitedInstruments.entries.associate { e -> Pair(Instrument.valueOf(e.key.name), e.value) }
        )
      ),
      Memo(input.memo)
    )
    val recruitment = Recruitment.recruit(
      domainEventIdFactory,
      recruitmentIdFactory,
      recruitCommand
    )
    repository.save(recruitment)

    // ドメインイベントを発行する
    recruitment.occurredEvents.forEach { e -> eventPublisher.publishEvent(e) }

    return RecruitCommandOutput(recruitment.id.value)
  }
}

data class RecruitCommandInput(
  val owner: UUID,
  val ownerInstruments: List<InstrumentType>,
  val songTitle: String,
  val artist: String,
  val name: String,
  val genre: List<MusicGenreType>,
  val deadline: Instant,
  val requiredGenerations: Set<RequiredGenerationType>,
  val requiredGenders: Set<RequiredGenderType>,
  val recruitedInstruments: Map<InstrumentType, Short>,
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
    GUITAR,
    ELECTRIC_BASE,
    DRUM,
    KEY_BOARD,
    PIANO,
    VIOLIN,
    OTHER
  }

  enum class RequiredGenerationType {
    TEEN,
    TWENTIES,
    THIRTIES,
    FORTIES,
    FIFTIES,
    MORE_THAN_SIXTIES,
  }

  enum class RequiredGenderType {
    MALE_ONLY,
    FEMALE_ONLY,
    OTHER
  }
}

data class RecruitCommandOutput(val id: UUID)