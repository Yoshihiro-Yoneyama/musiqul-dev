package msq.musiqulapi.presentation.weather

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetWeatherController {
  @GetMapping("api/weather")
  fun get(): GetWeatherResponse {
    return GetWeatherResponse(
      weatherId = "123",
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
