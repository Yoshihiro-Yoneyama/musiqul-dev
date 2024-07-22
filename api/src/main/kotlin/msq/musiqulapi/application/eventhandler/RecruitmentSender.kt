package msq.musiqulapi.application.eventhandler

import msq.musiqulapi.domain.model.collab.recruitment.RecruitedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import org.springframework.transaction.event.TransactionPhase
import org.springframework.transaction.event.TransactionalEventListener

@Component
class RecruitmentSender {
//  @EventListener
//  fun postToX(event: RecruitedEvent) {
//    // Xに投稿
//    println("postToX")
//  }
}