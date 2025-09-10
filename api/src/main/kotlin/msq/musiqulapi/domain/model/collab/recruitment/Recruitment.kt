package msq.musiqulapi.domain.model.collab.recruitment

import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.player.PlayerId
import msq.musiqulapi.lib.IdFactory

/** 募集 */
sealed interface Recruitment {
  // イベントは複数個発生する可能性があるので、Listで保持する
  /** 発生したドメインイベントのリスト */
  val occurredEvents: List<DomainEvent>
  /** 募集ID */
  val id: RecruitmentId
  /** 募集のオーナーID */
  val owner: PlayerId
  /** オーナーの使用可能楽器 */
  val ownerInstruments: List<Instrument>
  /** 募集の詳細情報 */
  val songTitle: SongTitle // デフォルト空文字列
  /** アーティスト名 */
  val artist: Artist // デフォルト空文字列
  /** 募集名 */
  val name: RecruitmentName
  /** ジャンル */
  val genres: List<MusicGenre>
  /** 締め切り日時 */
  val deadline: DeadLine
  /** 必須世代 */
  val requiredGenerations: Set<RequiredGeneration>
  /** 必須性別 */
  val requiredGender: Set<RequiredGender>
  /** 募集楽器とその人数 */
  val recruitedInstruments: RequiredInstrumentsAndCounts
  /** メモ */
  val memo: Memo // デフォルト空文字列
  /** 募集の状態 */
  val recruitmentStatus: RecruitmentStatus
  /** 削除可否 */
  val deleted: Boolean

  companion object {

    /**
     * 募集を新規作成する
     *
     * @param eventIdFactory ドメインイベントIDのファクトリ
     * @param idFactory 募集IDのファクトリ
     * @param command 募集作成コマンド
     * @return 作成された募集
     */
    fun recruit(
      eventIdFactory: IdFactory<DomainEventId>,
      idFactory: IdFactory<RecruitmentId>,
      command: RecruitCommand,
    ): Recruitment {
      val eventId = eventIdFactory.generate()
      val id = idFactory.generate()
      val recruitedEvent =
        RecruitedEvent(
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
          command.memo,
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
        false,
      )
    }
  }

  /**
   * 募集を編集する
   *
   * @param eventIdFactory ドメインイベントIDのファクトリ
   * @param command 募集編集コマンド
   * @return 編集された募集
   */
  fun edit(eventIdFactory: IdFactory<DomainEventId>, command: RecruitEditedCommand): Recruitment {
    val eventId = eventIdFactory.generate()
    val recruitmentEditedEvent =
      RecruitmentEditedEvent(
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
        command.memo,
      )

    return when (this) {
      is Data ->
        copy(
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
          memo = command.memo,
        )
    }
  }

  /**
   * 募集を締め切る
   *
   * @param eventIdFactory ドメインイベントIDのファクトリ
   * @return 締め切られた募集
   */
  fun close(eventIdFactory: IdFactory<DomainEventId>): Recruitment {
    val eventId = eventIdFactory.generate()
    val event = RecruitmentClosedEvent(eventId, this.id)

    return when (this) {
      is Data ->
        copy(
          occurredEvents = this.occurredEvents.plus(event),
          recruitmentStatus = RecruitmentStatus.CLOSE,
        )
    }
  }

  //  fun reopen() {}

  fun delete() {}

  /** 集約更新に必要なデータモデル */
  private data class Data(
    override val occurredEvents: List<DomainEvent>,
    override val id: RecruitmentId,
    override val owner: PlayerId,
    override val ownerInstruments: List<Instrument>,
    override val songTitle: SongTitle, // デフォルト空文字列
    override val artist: Artist, // デフォルト空文字列
    override val name: RecruitmentName,
    override val genres: List<MusicGenre>,
    override val deadline: DeadLine,
    override val requiredGenerations: Set<RequiredGeneration>,
    override val requiredGender: Set<RequiredGender>,
    override val recruitedInstruments: RequiredInstrumentsAndCounts,
    override val memo: Memo, // デフォルト空文字列
    override val recruitmentStatus: RecruitmentStatus,
    override val deleted: Boolean,
  ) : Recruitment
}

/** IDを除く集約のデータモデル(集約の新規作成に使用する) */
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
  val memo: Memo,
)

/** IDを除く集約のデータモデル(集約の編集に使用する) */
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
  val memo: Memo,
)

/** 募集作成イベント */
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
  val memo: Memo,
) : DomainEvent

/** 募集編集イベント */
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
  val memo: Memo,
) : DomainEvent

/** 募集締め切りイベント */
data class RecruitmentClosedEvent(override val eventId: DomainEventId, val id: RecruitmentId) :
  DomainEvent
