package msq.musiqulapi.application.query.task.get

class GetTaskController

data class GetTaskResponse(
  val id: String,
  val title: String,
  val description: String,
  val due: String,
)
