package msq.musiqulapi.presentation.auth

data class LoginRequest(val loginId: String, val password: String)

data class LoginResponse(val headerName: String, val token: String)
