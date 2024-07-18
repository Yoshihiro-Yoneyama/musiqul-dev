package msq.musiqulapi.presentation.command.collab.recruit.create

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {
  @PostMapping("/test")
  fun f(@RequestBody request: TestRequest): String {
    println(request)
    return "OK"
  }
}

data class TestRequest(
  val name: String
)