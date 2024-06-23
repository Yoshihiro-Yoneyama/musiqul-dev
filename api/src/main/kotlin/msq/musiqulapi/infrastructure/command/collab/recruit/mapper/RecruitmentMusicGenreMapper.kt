package msq.musiqulapi.infrastructure.command.collab.recruit.mapper

import nu.studer.sample.enums.MusicGenreType
import org.jooq.DSLContext
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class UpsertRecruitmentMusicGenreMapper(val dslContext: DSLContext) {
}

data class RecruitmentMusicGenreRecord(
  val recruitmentId: UUID,
  val genre: MusicGenreType,
)