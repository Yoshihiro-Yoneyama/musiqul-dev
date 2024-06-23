package msq.musiqulapi.infrastructure.command.collab.recruit.mapper


import nu.studer.sample.enums.InstrumentType
import nu.studer.sample.tables.references.RECRUITED_INSTRUMENT
import org.jooq.DSLContext
import org.jooq.Record3
import org.springframework.stereotype.Component
import java.util.*

@Component
class RecruitedInstrumentMapper(val dslContext: DSLContext) {
  fun insert(records: List<Record3<UUID?, InstrumentType?, Short?>>) {
    dslContext.insertInto(
      RECRUITED_INSTRUMENT,
      RECRUITED_INSTRUMENT.RECRUITMENT_ID,
      RECRUITED_INSTRUMENT.INSTRUMENT,
      RECRUITED_INSTRUMENT.COUNT,
    )
      .valuesOfRecords(records)
      .execute()
  }

//  fun delete
}