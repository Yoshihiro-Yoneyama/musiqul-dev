package msq.musiqulapi.application.eventhandler

import msq.musiqulapi.domain.model.collab.recruitment.RecruitedEvent
import org.springframework.context.event.EventListener

class RecruitmentEventHandler {

  @EventListener
  fun recruitedEventHandle(event: RecruitedEvent) {
    // Xに投稿
    // 演者一覧リードモデルを更新
    println(event)
  }
}