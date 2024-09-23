package msq.musiqulapi.infrastructure.mapper.command.collab.recruitment


import nu.studer.sample.enums.InstrumentType
import nu.studer.sample.tables.references.RECRUITMENT_RECRUITED_INSTRUMENT
import org.jooq.DSLContext
import org.jooq.Record3
import org.springframework.stereotype.Component
import java.util.*

@Component
class RecruitmentRecruitedInstrumentMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record3<UUID?, InstrumentType?, Short?>>) {
    dslContext.insertInto(
      RECRUITMENT_RECRUITED_INSTRUMENT,
      RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID,
      RECRUITMENT_RECRUITED_INSTRUMENT.INSTRUMENT,
      RECRUITMENT_RECRUITED_INSTRUMENT.COUNT,
    )
      .valuesOfRecords(records)
      .execute()
  }

  fun delete(recruitmentId: UUID) {
    dslContext
      .delete(RECRUITMENT_RECRUITED_INSTRUMENT)
      .where(RECRUITMENT_RECRUITED_INSTRUMENT.RECRUITMENT_ID.eq(recruitmentId))
      .execute()
  }
}