package msq.musiqulapi.presentation.command.collab.recruit.create

import msq.musiqulapi.application.command.collab.recruitment.RecruitCommandInput
import msq.musiqulapi.application.command.collab.recruitment.RecruitCommandService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.UUID

@RestController
class CreateRecruitmentController(val recruitmentCommandService: RecruitCommandService) {
  @PostMapping("/recruitment")
  fun create(@RequestBody request: CreateRecruitCommandRequest): CreateRecruitmentResponse {
    println(request)
    val input = RecruitCommandInput(
      request.name,
      request.owner,
      request.genre.map { r ->
        when (r) {
          CreateRecruitCommandRequest.MusicGenreType.ROCK -> RecruitCommandInput.MusicGenreType.ROCK
          CreateRecruitCommandRequest.MusicGenreType.J_POP -> RecruitCommandInput.MusicGenreType.J_POP
          CreateRecruitCommandRequest.MusicGenreType.ANIME -> RecruitCommandInput.MusicGenreType.ANIME
          CreateRecruitCommandRequest.MusicGenreType.JAZZ -> RecruitCommandInput.MusicGenreType.JAZZ
          CreateRecruitCommandRequest.MusicGenreType.CLASSIC -> RecruitCommandInput.MusicGenreType.CLASSIC
          CreateRecruitCommandRequest.MusicGenreType.METAL -> RecruitCommandInput.MusicGenreType.METAL
          CreateRecruitCommandRequest.MusicGenreType.OTHER -> RecruitCommandInput.MusicGenreType.OTHER
        }
      },
      request.songTitle,
      request.artist,
      request.ownerInstruments.map { r ->
        when (r) {
          CreateRecruitCommandRequest.InstrumentType.VOCAL -> RecruitCommandInput.InstrumentType.VOCAL
          CreateRecruitCommandRequest.InstrumentType.GITTER -> RecruitCommandInput.InstrumentType.GITTER
          CreateRecruitCommandRequest.InstrumentType.ELECTRIC_BASE -> RecruitCommandInput.InstrumentType.ELECTRIC_BASE
          CreateRecruitCommandRequest.InstrumentType.DRUM -> RecruitCommandInput.InstrumentType.DRUM
          CreateRecruitCommandRequest.InstrumentType.KEY_BOARD -> RecruitCommandInput.InstrumentType.KEY_BOARD
          CreateRecruitCommandRequest.InstrumentType.PIANO -> RecruitCommandInput.InstrumentType.PIANO
          CreateRecruitCommandRequest.InstrumentType.VIOLIN -> RecruitCommandInput.InstrumentType.VIOLIN
          CreateRecruitCommandRequest.InstrumentType.OTHER -> RecruitCommandInput.InstrumentType.OTHER
        }
      },
      request.recruitedInstruments.entries.associate { e ->
        val instrumentType = when (e.key) {
          CreateRecruitCommandRequest.InstrumentType.VOCAL -> RecruitCommandInput.InstrumentType.VOCAL
          CreateRecruitCommandRequest.InstrumentType.GITTER -> RecruitCommandInput.InstrumentType.GITTER
          CreateRecruitCommandRequest.InstrumentType.ELECTRIC_BASE -> RecruitCommandInput.InstrumentType.ELECTRIC_BASE
          CreateRecruitCommandRequest.InstrumentType.DRUM -> RecruitCommandInput.InstrumentType.DRUM
          CreateRecruitCommandRequest.InstrumentType.KEY_BOARD -> RecruitCommandInput.InstrumentType.KEY_BOARD
          CreateRecruitCommandRequest.InstrumentType.PIANO -> RecruitCommandInput.InstrumentType.PIANO
          CreateRecruitCommandRequest.InstrumentType.VIOLIN -> RecruitCommandInput.InstrumentType.VIOLIN
          CreateRecruitCommandRequest.InstrumentType.OTHER -> RecruitCommandInput.InstrumentType.OTHER
        }
        instrumentType to e.value
      },
      request.requiredGenerations.map { r ->
        when (r) {
          CreateRecruitCommandRequest.RequiredGeneration.TEEN -> RecruitCommandInput.RequiredGeneration.TEEN
          CreateRecruitCommandRequest.RequiredGeneration.TWENTIES -> RecruitCommandInput.RequiredGeneration.TWENTIES
          CreateRecruitCommandRequest.RequiredGeneration.THIRTIES -> RecruitCommandInput.RequiredGeneration.THIRTIES
          CreateRecruitCommandRequest.RequiredGeneration.FORTIES -> RecruitCommandInput.RequiredGeneration.FORTIES
          CreateRecruitCommandRequest.RequiredGeneration.FIFTIES -> RecruitCommandInput.RequiredGeneration.FIFTIES
          CreateRecruitCommandRequest.RequiredGeneration.MORE_THAN_SIXTIES -> RecruitCommandInput.RequiredGeneration.MORE_THAN_SIXTIES
        }
      }.toSet(),
      when (request.requiredGender) {
        CreateRecruitCommandRequest.GenderType.MALE_ONLY -> RecruitCommandInput.GenderType.MALE_ONLY
        CreateRecruitCommandRequest.GenderType.FEMALE_ONLY -> RecruitCommandInput.GenderType.FEMALE_ONLY
        CreateRecruitCommandRequest.GenderType.ALL -> RecruitCommandInput.GenderType.ALL
      },
      request.deadline,
      request.memo
    )
    val output = recruitmentCommandService.recruit(input)
    return CreateRecruitmentResponse(output.id)
  }
}

data class CreateRecruitCommandRequest(
  val name: String,
  val owner: UUID,
  val genre: List<MusicGenreType>,
  val songTitle: String,
  val artist: String,
  val ownerInstruments: List<InstrumentType>,
  val recruitedInstruments: Map<InstrumentType, Short>,
  val requiredGenerations: Set<RequiredGeneration>,
  val requiredGender: GenderType,
  val deadline: Instant,
  val memo: String
) {
  enum class MusicGenreType {
    ROCK,
    J_POP,
    ANIME,
    JAZZ,
    CLASSIC,
    METAL,
    OTHER
  }

  enum class InstrumentType {
    VOCAL,
    GITTER,
    ELECTRIC_BASE,
    DRUM,
    KEY_BOARD,
    PIANO,
    VIOLIN,
    OTHER
  }

  enum class RequiredGeneration {
    TEEN,
    TWENTIES,
    THIRTIES,
    FORTIES,
    FIFTIES,
    MORE_THAN_SIXTIES,
  }

  enum class GenderType {
    MALE_ONLY,
    FEMALE_ONLY,
    ALL
  }
}

data class CreateRecruitmentResponse(
  val id: UUID
)