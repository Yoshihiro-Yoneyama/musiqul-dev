package msq.musiqulapi.domain.user

interface UserRepository {
  fun save(user: User)
}