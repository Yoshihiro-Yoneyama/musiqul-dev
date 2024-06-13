package msq.musiqulapi.infrastructure.service.task

import lombok.NonNull
import msq.musiqulapi.domain.model.test_task.Task
import msq.musiqulapi.domain.model.test_task.TaskId
import msq.musiqulapi.domain.model.test_task.TaskRepository
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class TaskRepositoryImpl (@NonNull private val db: DSLContext): TaskRepository {
  override fun find(id: TaskId): Task {
    TODO("Not yet implemented")
  }

  override fun save(task: Task) {
    TODO("Not yet implemented")
  }
}