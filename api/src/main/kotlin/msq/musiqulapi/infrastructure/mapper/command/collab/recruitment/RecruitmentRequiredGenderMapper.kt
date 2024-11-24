package msq.musiqulapi.infrastructure.mapper.command.collab.recruitment

import nu.studer.sample.enums.RequiredGenderType
import nu.studer.sample.tables.references.RECRUITMENT_REQUIRED_GENDER
import org.jooq.DSLContext
import org.jooq.Record2
import org.springframework.stereotype.Component
import java.util.*

@Component
class RecruitmentRequiredGenderMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record2<UUID?, RequiredGenderType?>>) {
    dslContext.insertInto(
      RECRUITMENT_REQUIRED_GENDER,
      RECRUITMENT_REQUIRED_GENDER.RECRUITMENT_ID,
      RECRUITMENT_REQUIRED_GENDER.REQUIRED_GENDER,
    )
      .valuesOfRecords(records)
      .execute()
  }

  fun delete(recruitmentId: UUID) {
    dslContext
      .delete(RECRUITMENT_REQUIRED_GENDER)
      .where(RECRUITMENT_REQUIRED_GENDER.RECRUITMENT_ID.eq(recruitmentId))
      .execute()
  }
}