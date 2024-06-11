package msq.musiqulapi.domain.model.user

interface UserRepository {
  fun save(user: User)
}