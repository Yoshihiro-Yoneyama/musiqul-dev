package msq.musiqulapi.application.query.collab_for_search

import java.util.*

@JvmRecord
data class Recruitment(
  val id: UUID,
  val name: String?,
  val owner: UUID?,
  val genres: List<String>?,
  val songTitle: String?,
  val artist: String?,
  val generations: List<String>?,
  // 応募している楽器のみ表示
  val instruments: List<String>?,
  val gender: String?,
)

@JvmRecord
data class RecruitmentOwner(
  val ownerId: UUID,
  val ownerName: String?,
)