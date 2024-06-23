package msq.musiqulapi.presentation.weather

import msq.musiqulapi.domain.model.test_task.TaskId
import msq.musiqulapi.lib.IdFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.locks.Lock

@RestController
class GetWeatherController(val factory: IdFactory<TaskId>) {

  @GetMapping("api/weather")
  fun get(): GetWeatherResponse {
    val id = factory.generate()

    koukai(::print)

    return GetWeatherResponse(
      weatherId = id.value.toString(),
      label = "label",
      title = "title",
    )
  }
}

data class GetWeatherResponse(
  val weatherId: String,
  val label: String,
  val title: String,
)

fun koukai(print: () -> String) {
  print()
}

fun print(): String {
 return "aaa";
}

fun koukai2(kannsuu: (str: String) -> Int): Int {
  val v = "a"
  return kannsuu(v)
}

fun kannsuu(str: String): String {
  if (str == "a") return "aaa"
  else return "bbb"
}