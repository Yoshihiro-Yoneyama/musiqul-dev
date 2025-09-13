package msq.musiqulapi.domain

/**
 * ドメインイベントを保持する基本クラス
 *
 * @param <A> 継承するサブクラスの型
 */
@Suppress("UNCHECKED_CAST")
abstract class DomainEventHolder<A : DomainEventHolder<A>> {

  /** ドメインイベントリスト */
  private val domainEvents: MutableList<DomainEvent> = mutableListOf()

  protected fun addEvent(event: DomainEvent): A = this as A

  fun clearEvents() {
    domainEvents.clear()
  }

  fun getEvents(): List<DomainEvent> = domainEvents.toList()
}
