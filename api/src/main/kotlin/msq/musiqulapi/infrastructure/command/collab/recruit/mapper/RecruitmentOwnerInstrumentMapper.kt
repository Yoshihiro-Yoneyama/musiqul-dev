package msq.musiqulapi.infrastructure.command.collab.recruit.mapper

import nu.studer.sample.enums.InstrumentType
import org.jooq.DSLContext
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class UpsertRecruitmentOwnerInstrumentMapper(val dslContext: DSLContext) {
}

data class RecruitmentOwnerInstrumentRecord(
  val recruitmentId: UUID,
  val ownerInstrument: InstrumentType
)