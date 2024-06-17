package msq.musiqulapi.lib

interface IdFactory<T> {
  fun generate(): T
}