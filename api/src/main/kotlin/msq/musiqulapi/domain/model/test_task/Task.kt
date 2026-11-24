package msq.musiqulapi.domain.model.test_task

import lombok.Value
import msq.musiqulapi.lib.IdFactory

@Value(staticConstructor = "of")
class Task private constructor(
  val id: TaskId,
  val title: TaskTitle,
  val description: TaskDescription,
  val status: TaskStatus,
  val due: TaskDue,
  val finishedDate: TaskFinishedDate?,
) {
  companion object {
    fun create(
      idFactory: IdFactory<TaskId>,
      title: TaskTitle,
      description: TaskDescription,
      due: TaskDue,
    ): Task = Task(
      idFactory.generate(),
      title,
      description,
      TaskStatus.UNDONE,
      due,
      null,
    )
  }
}
