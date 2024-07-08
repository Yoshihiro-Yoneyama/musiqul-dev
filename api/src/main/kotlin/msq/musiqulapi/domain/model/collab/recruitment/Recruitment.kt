package msq.musiqulapi.domain.model.collab.recruitment

import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.player.PlayerId
import msq.musiqulapi.lib.IdFactory

sealed interface Recruitment {
  val occurredEvents: List<DomainEvent>
  val id: RecruitmentId
  val name: RecruitmentName
  val owner: PlayerId
  val genre: List<MusicGenre>
  val songTitle: SongTitle //デフォルト空文字列
  val artist: Artist //デフォルト空文字列
  val ownerInstruments: List<Instrument>
  val recruitedInstruments: RequiredInstrumentsAndCounts
  val requiredGenerations: Set<RequiredGeneration>
  val requiredGender: RequiredGender
  val deadline: DeadLine
  val memo: Memo //デフォルト空文字列
  val recruitmentStatus: RecruitmentStatus
  val deleted: Boolean

  companion object {
    fun recruit(
      eventIdFactory: IdFactory<DomainEventId>,
      idFactory: IdFactory<RecruitmentId>,
      command: RecruitCommand
    ): Recruitment {
      val eventId = eventIdFactory.generate()
      val id = idFactory.generate()
      val recruitedEvent = RecruitedEvent(
        eventId,
        id,
        command.name,
        command.owner,
        command.genre,
        command.songTitle,
        command.ownerInstruments,
        command.recruitedInstruments,
        command.requiredAgeRange,
        command.requiredGender,
        command.deadline,
        command.memo
      )
      return Data(
        listOf(recruitedEvent),
        id,
        command.name,
        command.owner,
        command.genre,
        command.songTitle,
        command.artist,
        command.ownerInstruments,
        command.recruitedInstruments,
        command.requiredAgeRange,
        command.requiredGender,
        command.deadline,
        command.memo,
        RecruitmentStatus.OPEN,
        false
      )
    }
  }

  fun close(eventIdFactory: IdFactory<DomainEventId>): Recruitment {
    val eventId = eventIdFactory.generate()
    val event = RecruitmentClosedEvent(eventId)

    return when (this) {
      is Data -> copy(
        occurredEvents = this.occurredEvents.plus(event),
        recruitmentStatus = RecruitmentStatus.CLOSE
      )
    }
  }

  fun edit() {}

//  fun reopen() {}

  fun delete() {}

  private data class Data(
    override val occurredEvents: List<DomainEvent>,
    override val id: RecruitmentId,
    override val name: RecruitmentName,
    override val owner: PlayerId,
    override val genre: List<MusicGenre>,
    override val songTitle: SongTitle, //デフォルト空文字列
    override val artist: Artist, //デフォルト空文字列
    override val ownerInstruments: List<Instrument>,
    override val recruitedInstruments: RequiredInstrumentsAndCounts,
    override val requiredGenerations: Set<RequiredGeneration>,
    override val requiredGender: RequiredGender,
    override val deadline: DeadLine,
    override val memo: Memo, //デフォルト空文字列
    override val recruitmentStatus: RecruitmentStatus,
    override val deleted: Boolean
  ) : Recruitment

}

data class RecruitCommand(
  val name: RecruitmentName,
  val owner: PlayerId,
  val genre: List<MusicGenre>,
  val songTitle: SongTitle,
  val artist: Artist,
  val ownerInstruments: List<Instrument>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val requiredAgeRange: Set<RequiredGeneration>,
  val requiredGender: RequiredGender,
  val deadline: DeadLine,
  val memo: Memo
)

data class RecruitedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
  val name: RecruitmentName,
  val owner: PlayerId,
  val genre: List<MusicGenre>,
  val songTitle: SongTitle,
  val ownerInstruments: List<Instrument>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val requiredAgeRange: Set<RequiredGeneration>,
  val requiredGender: RequiredGender,
  val deadline: DeadLine,
  val memo: Memo
) : DomainEvent

data class RecruitmentClosedEvent(
  override val eventId: DomainEventId
) : DomainEvent
