package msq.musiqulapi.domain.model.task

interface TaskRepository {
  fun find(): String
  fun save()
}