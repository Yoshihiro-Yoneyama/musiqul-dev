package msq.musiqulapi.domain.model.player

import msq.musiqulapi.domain.DomainEvent

sealed interface Player {
    val occurredEvents: List<DomainEvent>
    val id: PlayerId
    val name: PlayerName
}