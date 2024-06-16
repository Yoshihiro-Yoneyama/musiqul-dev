package msq.musiqulapi.domain

import java.util.*

interface DomainEvent {
  val eventId: DomainEventId
}

@JvmInline
value class DomainEventId(val eventId: UUID)