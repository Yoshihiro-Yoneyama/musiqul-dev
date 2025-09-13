package msq.musiqulapi.infrastructure.mapper.command.collab.recruitment

import nu.studer.sample.enums.RequiredGenerationType
import nu.studer.sample.tables.references.RECRUITMENT_REQUIRED_GENERATION
import org.jooq.DSLContext
import org.jooq.Record2
import org.springframework.stereotype.Component
import java.util.*

@Component
class RecruitmentRequiredGenerationMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record2<UUID?, RequiredGenerationType?>>) {
    dslContext
      .insertInto(
        RECRUITMENT_REQUIRED_GENERATION,
        RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID,
        RECRUITMENT_REQUIRED_GENERATION.GENERATION_TYPE,
      ).valuesOfRecords(records)
      .execute()
  }

  fun delete(recruitmentId: UUID) {
    dslContext
      .delete(RECRUITMENT_REQUIRED_GENERATION)
      .where(RECRUITMENT_REQUIRED_GENERATION.RECRUITMENT_ID.eq(recruitmentId))
      .execute()
  }
}
