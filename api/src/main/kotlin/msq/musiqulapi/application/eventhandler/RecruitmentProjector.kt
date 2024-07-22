package msq.musiqulapi.application.eventhandler

import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.model.collab.recruitment.RecruitedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import org.springframework.transaction.event.TransactionPhase
import org.springframework.transaction.event.TransactionalEventListener

// TODO リードモデルの永続化を行なうロジックを追加する

@Component
class RecruitmentProjector {
  @EventListener
  fun editRecruitmentReadModel(event: RecruitedEvent) {
    // コラボ募集一覧リードモデルを更新
    println(event)
  }

//  @EventListener
//  fun editRecruitmentReadModel(event: PlayerCreatedEvent) {
//    // 演者リードモデルを更新
//    println(event)
//  }
}