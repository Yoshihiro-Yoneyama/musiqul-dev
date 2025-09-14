package msq.musiqulapi.domain.model.player

import msq.musiqulapi.domain.DomainEvent
import msq.musiqulapi.domain.model.util.Gender
import msq.musiqulapi.domain.model.util.Generation
import msq.musiqulapi.domain.model.util.Instrument
import msq.musiqulapi.domain.model.util.MusicGenre

/** プレイヤー */
sealed interface Player {
  val occurredEvents: List<DomainEvent>
  val id: PlayerId
  val name: PlayerName
  val numOfCollabParticipation: NumOfCollabParticipation
  val numOfFan: NumOfFan
  val generation: Generation
  val gender: Gender
  val instrument: Instrument
  val genre: MusicGenre
  val description: Description
  val deleted: Boolean
}
