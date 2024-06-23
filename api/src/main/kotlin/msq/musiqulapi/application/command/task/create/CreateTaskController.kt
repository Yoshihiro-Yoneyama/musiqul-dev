package msq.musiqulapi.application.command.task.create

class CreateTaskController {
}

data class CreateTaskRequest(
    val title: String,
    val description: String,
    val deadline: String,
)