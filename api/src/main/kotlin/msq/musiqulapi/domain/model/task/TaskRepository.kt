package msq.musiqulapi.domain.model.task

interface TaskRepository {
  fun find(id: TaskId): Task
  fun save(task: Task)
}