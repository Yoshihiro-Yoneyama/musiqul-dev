package msq.musiqulapi.presentation.user.get

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetUserController {
  @GetMapping("api/user")
  fun get(): GetUserResponse {
    return GetUserResponse(
      userId = "123",
      userName = "userName",
    )
  }
}

data class GetUserResponse(
  val userId: String,
  val userName: String,
)