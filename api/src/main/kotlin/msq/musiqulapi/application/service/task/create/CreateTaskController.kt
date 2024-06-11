package msq.musiqulapi.application.service.task.create

class CreateTaskController {
}

data class CreateTaskRequest(
    val title: String,
    val description: String,
    val deadline: String,
)