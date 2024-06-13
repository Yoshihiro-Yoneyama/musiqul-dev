package msq.musiqulapi.domain.model.test_user

interface UserRepository {
  fun save(user: User)
}