package msq.musiqulapi.infrastructure

import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.player.PlayerId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentId
import msq.musiqulapi.domain.model.test_task.TaskId
import msq.musiqulapi.lib.IdFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.*

@Configuration
class IdFactoryConfig {
  companion object {
    private fun <T> uuidFactory(f: (UUID) -> T): IdFactory<T> {
      return object : IdFactory<T> {
        override fun generate(): T {
          return f(UUID.randomUUID())
        }
      }
    }
  }

  @Bean
  fun domainEventIdFactory(): IdFactory<DomainEventId> {
    return uuidFactory{id -> DomainEventId(id)}
  }

  @Bean
  fun recruitmentIdFactory(): IdFactory<RecruitmentId> {
    return uuidFactory(RecruitmentId::from)
  }

  @Bean
  fun taskIdFactory(): IdFactory<TaskId> {
    return uuidFactory(TaskId::reconstruct)
  }

  @Bean
  fun playerIdFactory(): IdFactory<PlayerId> {
    return uuidFactory(PlayerId::from)
  }
}
