package msq.musiqulapi.domain.task

import msq.musiqulapi.domain.model.task.TaskId
import msq.musiqulapi.domain.model.task.TaskTitle
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class TaskValueObjectTest{
  @Nested
  inner class TaskIdTests {
    @Test
    fun `タスクIDが生成される`() {
      val taskId = TaskId.generate()
      assert(taskId.value.isNotBlank())
    }
  }

  @Nested
  inner class TaskTitleTests {
    @Test
    fun `タスクタイトルのインスタンスを生成する`() {
      val value = "Task Title"
      val taskTitle = TaskTitle(value)
      assertEquals(value, taskTitle.value)
    }

    @Test
    fun `タスクタイトルが50文字以上の場合例外が発生する`() {
      assertThrows(IllegalArgumentException::class.java) {
        TaskTitle("a".repeat(51))
      }
    }
  }
}