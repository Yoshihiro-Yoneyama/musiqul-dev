package msq.musiqulapi.application.query.colab.collab_for_search

import msq.musiqulapi.domain.model.collab.recruitment.*
import msq.musiqulapi.domain.model.util.Gender
import msq.musiqulapi.domain.model.util.Generation
import msq.musiqulapi.domain.model.util.Instrument
import msq.musiqulapi.domain.model.util.MusicGenre
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

// TODO リードモデルの永続化を行なうロジックを追加する

/**
 * コラボ募集一覧リードモデルを登録・更新するプロジェクター
 */
@Component
class CollabForSearchProjector(
  val recruitmentRepository: RecruitmentRepository,
  val collabForSearchQueryRepository: CollabForSearchQueryRepository,
) {
  /**
   * コラボ募集一覧リードモデルを登録
   */
  @EventListener
  fun putRecruitment(event: RecruitedEvent) {
    val recruitmentReadModel =
      Recruitment(
        event.id.value,
        event.owner.value,
        event.name.value,
        event.songTitle.value,
        event.artist.value,
        event.genres.map(MusicGenre::name),
        event.deadline.value,
        event.requiredGenerations.map(Generation::name),
        event.gender.map(Gender::name),
        event.recruitedInstruments.value.map.keys
          .map(Instrument::name),
      )
    println("**************イベント検知****************")

    collabForSearchQueryRepository.saveRecruitment(recruitmentReadModel)
  }

  /**
   * コラボ募集一覧リードモデルを更新
   */
  @EventListener
  fun editRecruitmentReadModel(event: RecruitmentEditedEvent) {
    recruitmentRepository
      .findById(event.id)
      .map { recruitment ->
        Recruitment(
          event.id.value,
          recruitment.owner.value,
          event.songTitle.value,
          event.artist.value,
          event.name.value,
          event.genres.map(MusicGenre::name),
          event.deadline.value,
          event.requiredGenerations.map(Generation::name),
          event.genders.map(Gender::name),
          event.recruitedInstruments.value.map.keys
            .map(Instrument::name),
        )
      }.fold(
        { error -> throw RuntimeException(error.error) }, // Left の場合は例外をスロー
        { recruitmentReadModel ->
          collabForSearchQueryRepository.saveRecruitment(recruitmentReadModel)
        },
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
