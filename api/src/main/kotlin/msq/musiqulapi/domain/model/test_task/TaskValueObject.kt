package msq.musiqulapi.domain.model.test_task

import java.util.*

private const val TASK_TITLE_MAX_LENGTH = 50
private const val TASK_DESCRIPTION_MAX_LENGTH = 300

@JvmInline
value class TaskId private constructor(val value: UUID) {
  companion object {
    fun reconstruct(id: UUID): TaskId = TaskId(id)
  }
}

@JvmInline
value class TaskTitle(val value: String) {
  init {
    require(value.length <= TASK_TITLE_MAX_LENGTH) {
      "Task title must be $TASK_TITLE_MAX_LENGTH characters or less"
    }
  }
}

@JvmInline
value class TaskDescription(val value: String) {
  init {
    require(value.length <= TASK_DESCRIPTION_MAX_LENGTH) {
      "Task description must be $TASK_DESCRIPTION_MAX_LENGTH characters or less"
    }
  }
}

enum class TaskStatus(val value: String) {
  UNDONE("undone"),
  DONE("done"),
  ;

  companion object {
    fun TaskStatus.done(): TaskStatus {
      if (this != UNDONE) {
        throw IllegalStateException(
          "Cannot mark a task as done unless it is currently undone.",
        )
      }
      return DONE
    }

    fun TaskStatus.undone(): TaskStatus {
      if (this != DONE) {
        throw IllegalStateException(
          "Cannot mark a task as undone unless it is currently done.",
        )
      }
      return UNDONE
    }
  }
}

@JvmInline
value class TaskDue(val value: Date)

@JvmInline
value class TaskFinishedDate(val value: Date) {
  init {
    require(value.after(Date())) { "Task finished date must be in the future" }
  }
}
