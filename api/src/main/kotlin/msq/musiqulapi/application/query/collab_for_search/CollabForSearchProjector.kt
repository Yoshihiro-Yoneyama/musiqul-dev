package msq.musiqulapi.application.query.collab_for_search

import msq.musiqulapi.domain.model.collab.recruitment.Instrument
import msq.musiqulapi.domain.model.collab.recruitment.MusicGenre
import msq.musiqulapi.domain.model.collab.recruitment.RecruitedEvent
import msq.musiqulapi.domain.model.collab.recruitment.RequiredGeneration
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

// TODO リードモデルの永続化を行なうロジックを追加する

@Component
class CollabForSearchProjector(val repository: CollabForSearchQueryRepository) {

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
    repository.saveRecruitment(recruitmentReadModel)
  }

//  @EventListener
//  fun editRecruitmentReadModel(event: RecruitmentEditedEvent) {
//    // コラボ募集一覧リードモデルを更新
//    repository.saveRecruitment(event)
//  }

//  @EventListener
//  fun deleteRecruitmentReadModel(event: RecruitmentClosedEvent) {
//    // コラボ募集一覧リードモデルを削除
//    repository.deleteRecruitment(event)
//  }

  // TODO　playerCreatedEventが何かをはっきりさせる
  //  （おそらくplayerがコラボに応募した際に発火するイベントではあるが、メソッド名にownerがあるのが引っかかる）
//  @EventListener
//  fun putRecruitmentOwner(event: PlayerCreatedEvent) {
//    val owner = event;
//    repository.editRecruitmentReadModel(owner)
//  }

}