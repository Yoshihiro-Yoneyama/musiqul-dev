package msq.musiqulapi.application.query.collab_for_search

import msq.musiqulapi.domain.model.collab.recruitment.*
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

// TODO リードモデルの永続化を行なうロジックを追加する

@Component
class CollabForSearchProjector(
  val recruitmentRepository: RecruitmentRepository,
  val collabForSearchQueryRepository: CollabForSearchQueryRepository
) {
  /**
   * コラボ募集一覧リードモデルを登録
   */
  @EventListener
  fun putRecruitment(event: RecruitedEvent) {
    val recruitmentReadModel = Recruitment(
      event.id.value,
      event.name.value,
      event.owner.value,
      event.genres.map(MusicGenre::name),
      event.songTitle.value,
      event.artist.value,
      event.requiredGenerations.map(RequiredGeneration::name),
      event.recruitedInstruments.value.map.keys.map(Instrument::name),
      event.requiredGender.name
    )
    println("**************イベント検知****************")

    collabForSearchQueryRepository.saveRecruitment(recruitmentReadModel)
  }

  /**
   * コラボ募集一覧リードモデルを更新
   */
  @EventListener
  fun editRecruitmentReadModel(event: RecruitmentEditedEvent) {
    recruitmentRepository.findById(event.id)
      .toEither { "Recruitment not found for ID: ${event.id.value}" }
      .map { recruitment ->
        Recruitment(
          event.id.value,
          event.name.value,
          recruitment.owner.value,
          event.genres.map(MusicGenre::name),
          event.songTitle.value,
          event.artist.value,
          event.requiredGenerations.map(RequiredGeneration::name),
          event.recruitedInstruments.value.map.keys.map(Instrument::name),
          event.requiredGender.name
        )
      }
      .fold(
        { error -> throw RuntimeException(error) },  // Left の場合は例外をスロー
        { recruitmentReadModel -> collabForSearchQueryRepository.saveRecruitment(recruitmentReadModel) }
      )
  }


//  @EventListener
//  fun deleteRecruitmentReadModel(event: RecruitmentClosedEvent) {
//    // コラボ募集一覧リードモデルを削除
//    repository.deleteRecruitment(event)
//  }

  // TODO　playerCreatedEventはplayer集約が持つドメインイベント
  //    ownerIdとownerNameの紐づけを登録するメソッド
  //    playerを作成する時点でrecruitの機能で使われるowner全数=player全数になるからplayer作成時にeventを発行する
//  @EventListener
//  fun putRecruitmentOwner(event: PlayerCreatedEvent) {
//    val owner = event;
//    repository.editRecruitmentReadModel(owner)
//  }
//  }
}