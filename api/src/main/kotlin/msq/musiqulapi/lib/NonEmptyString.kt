package msq.musiqulapi.lib

data class NonEmptyString(private val str: String) {
  init {
    if (str.isEmpty()) {
      throw IllegalArgumentException("Invalid initial value")
    }
  }
}