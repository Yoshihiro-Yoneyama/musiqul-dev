package msq.musiqulapi.domain.model.collab.recruitment

import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.player.PlayerId
import msq.musiqulapi.lib.IdFactory

sealed interface Recruitment {
  // イベントをリストで作成する理由？
  val occurredEvents: List<DomainEvent>
  val id: RecruitmentId
  val name: RecruitmentName
  val owner: PlayerId
  val genres: List<MusicGenre>
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
        command.genres,
        command.songTitle,
        command.artist,
        command.ownerInstruments,
        command.recruitedInstruments,
        command.requiredGenerations,
        command.requiredGender,
        command.deadline,
        command.memo
      )
      return Data(
        listOf(recruitedEvent),
        id,
        command.name,
        command.owner,
        command.genres,
        command.songTitle,
        command.artist,
        command.ownerInstruments,
        command.recruitedInstruments,
        command.requiredGenerations,
        command.requiredGender,
        command.deadline,
        command.memo,
        RecruitmentStatus.OPEN,
        false
      )
    }
  }

  fun edit() {

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
    override val name: RecruitmentName,
    override val owner: PlayerId,
    override val genres: List<MusicGenre>,
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

// IDを除く集約のデータモデル
// 集約の新規作成に使用する
data class RecruitCommand(
  val name: RecruitmentName,
  val owner: PlayerId,
  val genres: List<MusicGenre>,
  val songTitle: SongTitle,
  val artist: Artist,
  val ownerInstruments: List<Instrument>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: RequiredGender,
  val deadline: DeadLine,
  val memo: Memo
)

data class RecruitedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
  val name: RecruitmentName,
  val owner: PlayerId,
  val genres: List<MusicGenre>,
  val songTitle: SongTitle,
  val artist: Artist,
  val ownerInstruments: List<Instrument>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: RequiredGender,
  val deadline: DeadLine,
  val memo: Memo
) : DomainEvent

data class RecruitmentEditedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
  val name: RecruitmentName,
  val genres: List<MusicGenre>,
  val songTitle: SongTitle,
  val artist: Artist,
  val ownerInstruments: List<Instrument>,
  val recruitedInstruments: RequiredInstrumentsAndCounts,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: RequiredGender,
  val deadline: DeadLine,
  val memo: Memo
) : DomainEvent

data class RecruitmentClosedEvent(
  override val eventId: DomainEventId,
  val id: RecruitmentId,
) : DomainEvent
