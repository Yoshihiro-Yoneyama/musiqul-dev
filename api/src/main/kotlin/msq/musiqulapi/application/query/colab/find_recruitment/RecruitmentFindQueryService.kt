package msq.musiqulapi.application.query.colab.find_recruitment

import java.util.UUID

interface RecruitmentFindQueryService {
  fun findRecruitment(input: RecruitmentFindInput): RecruitmentFindOutput
}

data class RecruitmentFindInput(val id: UUID)

data class RecruitmentFindOutput(
  val owner: UUID,
  val ownerName: String,
  val ownerInstrument: List<String>,
  val songTitle: String,
  val artist: String,
  val name: String,
  val genres: List<String>,
)
