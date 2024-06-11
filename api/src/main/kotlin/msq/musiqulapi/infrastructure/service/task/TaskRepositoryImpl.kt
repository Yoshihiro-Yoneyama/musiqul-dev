package msq.musiqulapi.infrastructure.service.task

import lombok.NonNull
import msq.musiqulapi.domain.model.task.TaskRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class TaskRepositoryImpl (@NonNull private val db: DSLContext): TaskRepository {
  override fun find(): String {
    TODO("Not yet implemented")
  }

  override fun save() {
    TODO("Not yet implemented")
  }
}