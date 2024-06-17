package msq.musiqulapi.application.command.collab.recruitment

import arrow.core.Option
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.player.PlayerId
import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.lib.IdFactory
import msq.musiqulapi.lib.NonEmptyMap
import msq.musiqulapi.lib.NonEmptyString
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
      input.songTitle.map { t -> SongTitle(NonEmptyString(t)) },
      input.artist.map { a -> Artist(NonEmptyString(a)) },
      input.ownerInstruments.map { i -> Instrument.valueOf(i.name) },
      RequiredInstrumentsAndCounts(
        NonEmptyMap(
          input.recruitedInstruments.entries.associate { e -> Pair(Instrument.valueOf(e.key.name), e.value) }
        )
      ),
      input.requiredAgeRange.map { r -> RequiredAgeRange.create(r) },
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
  val songTitle: Option<String>,
  val artist: Option<String>,
  val ownerInstruments: List<InstrumentType>,
  val recruitedInstruments: Map<InstrumentType, Int>,
  val requiredAgeRange: Option<IntRange>,
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
  enum class GenderType {
    MALE_ONLY,
    FEMALE_ONLY,
    ALL
  }
}

data class RecruitCommandOutput(val id: UUID)