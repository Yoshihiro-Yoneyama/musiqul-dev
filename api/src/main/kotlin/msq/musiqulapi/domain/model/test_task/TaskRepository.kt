package msq.musiqulapi.domain.model.test_task

interface TaskRepository {
  fun find(id: TaskId): Task
  fun save(task: Task)
}
