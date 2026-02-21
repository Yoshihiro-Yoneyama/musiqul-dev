package msq.musiqulapi.application.command.collab.recruit

import msq.musiqulapi.domain.DomainEventId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentId
import msq.musiqulapi.domain.model.collab.recruitment.RecruitmentRepository
import msq.musiqulapi.lib.IdFactory
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.times
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import org.springframework.context.ApplicationEventPublisher
import java.time.Instant
import java.util.UUID

class RecruitCommandServiceTest {
  private val domainEventIdFactory: IdFactory<DomainEventId> = mock()
  private val recruitmentIdFactory: IdFactory<RecruitmentId> = mock()
  private val repository: RecruitmentRepository = mock()
  private val eventPublisher: ApplicationEventPublisher = mock()

  private val sut =
    RecruitCommandService(
      domainEventIdFactory,
      recruitmentIdFactory,
      repository,
      eventPublisher,
    )

  @BeforeEach
  fun setUp() {
    whenever(domainEventIdFactory.generate()).thenReturn(DomainEventId(UUID.randomUUID()))
    whenever(recruitmentIdFactory.generate()).thenReturn(RecruitmentId.from(UUID.randomUUID()))
  }

  private fun buildInput(
    owner: UUID = UUID.randomUUID(),
    ownerInstruments: List<RecruitCommandInput.InstrumentType> =
      listOf(RecruitCommandInput.InstrumentType.GUITAR),
    songTitle: String = "Test Song",
    artist: String = "Test Artist",
    name: String = "Test Recruitment",
    genre: List<RecruitCommandInput.MusicGenreType> =
      listOf(RecruitCommandInput.MusicGenreType.ROCK),
    deadline: Instant = Instant.now().plusSeconds(3600),
    generations: Set<RecruitCommandInput.GenerationType> =
      setOf(RecruitCommandInput.GenerationType.TWENTIES),
    requiredGenders: Set<RecruitCommandInput.RequiredGenderType> =
      setOf(RecruitCommandInput.RequiredGenderType.OTHER),
    recruitedInstruments: Map<RecruitCommandInput.InstrumentType, Short> =
      mapOf(RecruitCommandInput.InstrumentType.DRUM to 1.toShort()),
    memo: String = "Test memo",
  ) = RecruitCommandInput(
    owner = owner,
    ownerInstruments = ownerInstruments,
    songTitle = songTitle,
    artist = artist,
    name = name,
    genre = genre,
    deadline = deadline,
    generations = generations,
    requiredGenders = requiredGenders,
    recruitedInstruments = recruitedInstruments,
    memo = memo,
  )

  @Nested
  inner class RecruitTests {
    @Test
    fun recruitmentIdが出力に含まれる() {
      val expectedId = UUID.randomUUID()
      whenever(recruitmentIdFactory.generate()).thenReturn(RecruitmentId.from(expectedId))

      val output = sut.recruit(buildInput())

      assertEquals(expectedId, output.id)
    }

    @Test
    fun リポジトリのsaveが1回呼ばれる() {
      sut.recruit(buildInput())

      verify(repository, times(1)).save(any())
    }

    @Test
    fun RecruitedEventが1件発行される() {
      sut.recruit(buildInput())

      verify(eventPublisher, times(1)).publishEvent(any<Any>())
    }

    @Test
    fun 全てのGenerationTypeがマッピングされる() {
      val input = buildInput(generations = RecruitCommandInput.GenerationType.entries.toSet())

      sut.recruit(input)

      verify(repository, times(1)).save(any())
    }

    @Test
    fun 全てのRequiredGenderTypeがマッピングされる() {
      val input =
        buildInput(requiredGenders = RecruitCommandInput.RequiredGenderType.entries.toSet())

      sut.recruit(input)

      verify(repository, times(1)).save(any())
    }

    @Test
    fun 全てのMusicGenreTypeがマッピングされる() {
      val input = buildInput(genre = RecruitCommandInput.MusicGenreType.entries)

      sut.recruit(input)

      verify(repository, times(1)).save(any())
    }

    @Test
    fun 全てのInstrumentTypeがオーナー楽器にマッピングされる() {
      val input = buildInput(ownerInstruments = RecruitCommandInput.InstrumentType.entries)

      sut.recruit(input)

      verify(repository, times(1)).save(any())
    }
  }
}