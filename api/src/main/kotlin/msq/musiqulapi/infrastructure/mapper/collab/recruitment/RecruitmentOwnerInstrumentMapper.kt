package msq.musiqulapi.infrastructure.mapper.collab.recruitment

import nu.studer.sample.enums.InstrumentType
import nu.studer.sample.tables.references.RECRUITMENT_OWNER_INSTRUMENT
import org.jooq.DSLContext
import org.jooq.Record2
import org.springframework.stereotype.Component
import java.util.*

@Component
class RecruitmentOwnerInstrumentMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record2<UUID?, InstrumentType?>>) {
    dslContext.insertInto(
      RECRUITMENT_OWNER_INSTRUMENT,
      RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID,
      RECRUITMENT_OWNER_INSTRUMENT.OWNER_INSTRUMENT,
    )
      .valuesOfRecords(records)
      .execute()
  }

  fun delete(recruitmentId: UUID) {
    dslContext
      .delete(RECRUITMENT_OWNER_INSTRUMENT)
      .where(RECRUITMENT_OWNER_INSTRUMENT.RECRUITMENT_ID.eq(recruitmentId))
      .execute()
  }
}