package msq.musiqulapi.domain.model.task

import java.util.Optional

class Task private constructor(
  val id: TaskId,
  val title: TaskTitle,
  val description: TaskDescription,
  val status: TaskStatus,
  val due: TaskDue,
  val finishedDate: TaskFinishedDate?
) {
  companion object {
    fun create(
      title: TaskTitle,
      description: TaskDescription,
      due: TaskDue,
    ): Task {
      return Task(
        TaskId.generate(),
        title,
        description,
        TaskStatus.UNDONE,
        due,
        null
      )
    }
  }
}