package msq.musiqulapi.lib

fun interface IdFactory<T> {
  fun generate(): T
}