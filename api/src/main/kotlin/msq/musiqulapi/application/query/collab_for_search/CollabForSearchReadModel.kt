package msq.musiqulapi.application.query.collab_for_search

import java.time.Instant
import java.util.*

@JvmRecord
data class Recruitment(
  val id: UUID,
  val owner: UUID?,
  val songTitle: String?,
  val artist: String?,
  val name: String?,
  val genres: List<String>?,
  val deadLine: Instant,
  val generations: List<String>?,
  val gender: List<String>?,
  // 応募している楽器のみ表示
  val instruments: List<String>?,
)

// This class is designed to retrieve individual player information.
@JvmRecord
data class RecruitmentOwner(
  val ownerId: UUID,
  val ownerName: String?,
)