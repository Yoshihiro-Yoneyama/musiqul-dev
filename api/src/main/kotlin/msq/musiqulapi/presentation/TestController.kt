package msq.musiqulapi.presentation

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {
  @GetMapping("/test")
  fun getPerson(): String {
    return "Hello World"
  }
}