package msq.musiqulapi.domain.model.collab.recruitment

import msq.musiqulapi.application.command.collab.edit_recruitment.EditRecruitmentCommandInput
import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.player.PlayerId
import msq.musiqulapi.lib.IdFactory

sealed interface Recruitment {
  // イベントは複数個発生する可能性があるので、Listで保持する
  val occurredEvents: List<DomainEvent>
  val id: RecruitmentId
  val owner: PlayerId
  val ownerInstruments: List<Instrument>
  val songTitle: SongTitle //デフォルト空文字列
  val artist: Artist //デフォルト空文字列
  val name: RecruitmentName
  val genres: List<MusicGenre>
  val deadline: DeadLine
  val requiredGenerations: Set<RequiredGeneration>
  val requiredGender: Set<RequiredGender>
  val recruitedInstruments: RequiredInstrumentsAndCounts
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
        command.owner,
        command.ownerInstruments,
        command.songTitle,
        command.artist,
        command.name,
        command.genres,
        command.deadline,
        command.requiredGenerations,
        command.requiredGender,
        command.recruitedInstruments,
        command.memo
      )
      return Data(
        listOf(recruitedEvent),
        id,
        command.owner,
        command.ownerInstruments,
        command.songTitle,
        command.artist,
        command.name,
        command.genres,
        command.deadline,
        command.requiredGenerations,
        command.requiredGender,
        command.recruitedInstruments,
        command.memo,
        RecruitmentStatus.OPEN,
        false
      )
    }
  }

  fun edit(
    eventIdFactory: IdFactory<DomainEventId>,
    command: RecruitEditedCommand
    ): Recruitment {
    val eventId = eventIdFactory.generate()
    val recruitmentEditedEvent = RecruitmentEditedEvent(
      eventId,
      this.id,
      command.ownerInstruments,
      command.songTitle,
      command.artist,
      command.name,
      command.genres,
      command.deadline,
      command.requiredGenerations,
      command.requiredGender,
      command.recruitedInstruments,
      command.memo
    )

    return when (this) {
      is Data -> copy(
        occurredEvents = this.occurredEvents.plus(recruitmentEditedEvent),
        ownerInstruments = command.ownerInstruments,
        songTitle = command.songTitle,
        artist = command.artist,
        name = command.name,
        genres = command.genres,
        deadline = command.deadline,
        requiredGenerations = command.requiredGenerations,
        requiredGender = command.requiredGender,
        recruitedInstruments = command.recruitedInstruments,
        memo = command.memo
      )
    }

  }

  fun close(eventIdFactory: IdFactory<DomainEventId>): Recruitment {
    val eventId = eventIdFactory.generate()
    val event = RecruitmentClosedEvent(eventId, this.id)

    return when (this) {
      is Data -> copy(
        occurredEvents = this.occurredEvents.plus(event),
        recruitmentStatus = RecruitmentStatus.CLOSE
      )
    }
  }

//  fun reopen() {}

  fun delete() {}

  // 集約更新に必要なデータモデル
  private data class Data(
    override val occurredEvents: List<DomainEvent>,
    override val id: RecruitmentId,
    override val owner: PlayerId,
    override val ownerInstruments: List<Instrument>,
    override val songTitle: SongTitle, //デフォルト空文字列
    override val artist: Artist, //デフォルト空文字列
    override val name: RecruitmentName,
    override val genres: List<MusicGenre>,
    override val deadline: DeadLine,
    override val requiredGenerations: Set<RequiredGeneration>,
    override val requiredGender: Set<RequiredGender>,
    override val recruitedInstruments: RequiredInstrumentsAndCounts,
    override val memo: Memo, //デフォルト空文字列
    override val recruitmentStatus: RecruitmentStatus,
    override val deleted: Boolean
  ) : Recruitment
}

// IDを除く集約のデータモデル
// 集約の新規作成に使用する
data class RecruitCommand(
  val owner: PlayerId,
  val ownerInstruments: List<Instrument>,
  val songTitle: SongTitle,
  val artist: Artist,
  val name: RecruitmentName,
  val genres: List<MusicGenre>,
  val deadline: DeadLine,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: Set<RequiredGender>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val memo: Memo
)

data class RecruitEditedCommand(
  val ownerInstruments: List<Instrument>,
  val songTitle: SongTitle,
  val artist: Artist,
  val name: RecruitmentName,
  val genres: List<MusicGenre>,
  val deadline: DeadLine,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: Set<RequiredGender>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val memo: Memo
)

data class RecruitedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
  val owner: PlayerId,
  val ownerInstruments: List<Instrument>,
  val songTitle: SongTitle,
  val artist: Artist,
  val name: RecruitmentName,
  val genres: List<MusicGenre>,
  val deadline: DeadLine,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: Set<RequiredGender>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val memo: Memo
) : DomainEvent

data class RecruitmentEditedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
  val ownerInstruments: List<Instrument>,
  val songTitle: SongTitle,
  val artist: Artist,
  val name: RecruitmentName,
  val genres: List<MusicGenre>,
  val deadline: DeadLine,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGenders: Set<RequiredGender>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val memo: Memo
) : DomainEvent

data class RecruitmentClosedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
) : DomainEvent
