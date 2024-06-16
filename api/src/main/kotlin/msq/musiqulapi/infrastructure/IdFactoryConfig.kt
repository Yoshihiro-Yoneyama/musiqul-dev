package msq.musiqulapi.infrastructure

import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentId
import msq.musiqulapi.lib.IdFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.*

@Configuration
class IdFactoryConfig {
  companion object {
    private fun <T> uuidFactory(f: (UUID) -> T): IdFactory<T> {
      return IdFactory { f(UUID.randomUUID())}
    }
  }

  @Bean
  fun recruitmentId(): IdFactory<RecruitmentId> {
    return uuidFactory(RecruitmentId::reconstruct)
  }
}