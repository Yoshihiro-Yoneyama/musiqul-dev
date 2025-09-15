package msq.musiqulapi.presentation.command.collab.recruit.create

import msq.musiqulapi.application.command.collab.recruit.RecruitCommandInput
import msq.musiqulapi.application.command.collab.recruit.RecruitCommandService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.*

@RestController
class CreateRecruitmentController(val recruitmentCommandService: RecruitCommandService) {
  @PostMapping("/recruitments")
  fun create(@RequestBody request: CreateRecruitCommandRequest): CreateRecruitmentResponse {
    val input = RecruitCommandInput(
      request.owner,
      request.ownerInstruments.map { r ->
        when (r) {
          CreateRecruitCommandRequest.InstrumentType.VOCAL ->
            RecruitCommandInput.InstrumentType.VOCAL
          CreateRecruitCommandRequest.InstrumentType.GUITAR ->
            RecruitCommandInput.InstrumentType.GUITAR
          CreateRecruitCommandRequest.InstrumentType.ELECTRIC_BASE ->
            RecruitCommandInput.InstrumentType.ELECTRIC_BASE
          CreateRecruitCommandRequest.InstrumentType.DRUM ->
            RecruitCommandInput.InstrumentType.DRUM
          CreateRecruitCommandRequest.InstrumentType.KEY_BOARD ->
            RecruitCommandInput.InstrumentType.KEY_BOARD
          CreateRecruitCommandRequest.InstrumentType.PIANO ->
            RecruitCommandInput.InstrumentType.PIANO
          CreateRecruitCommandRequest.InstrumentType.VIOLIN ->
            RecruitCommandInput.InstrumentType.VIOLIN
          CreateRecruitCommandRequest.InstrumentType.OTHER ->
            RecruitCommandInput.InstrumentType.OTHER
        }
      },
      request.songTitle,
      request.artist,
      request.name,
      request.genres.map { r ->
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
      request.deadline,
      request.requiredGenerations.map { r ->
        when (r) {
          CreateRecruitCommandRequest.RequiredGenerationType.TEEN ->
            RecruitCommandInput.GenerationType.TEEN
          CreateRecruitCommandRequest.RequiredGenerationType.TWENTIES -> RecruitCommandInput.GenerationType.TWENTIES
          CreateRecruitCommandRequest.RequiredGenerationType.THIRTIES -> RecruitCommandInput.GenerationType.THIRTIES
          CreateRecruitCommandRequest.RequiredGenerationType.FORTIES -> RecruitCommandInput.GenerationType.FORTIES
          CreateRecruitCommandRequest.RequiredGenerationType.FIFTIES -> RecruitCommandInput.GenerationType.FIFTIES
          CreateRecruitCommandRequest.RequiredGenerationType.MORE_THAN_SIXTIES -> RecruitCommandInput.GenerationType.MORE_THAN_SIXTIES
        }
      }.toSet(),
      request.requiredGenders.map { r ->
        when (r) {
          CreateRecruitCommandRequest.RequiredGenderType.MALE_ONLY -> RecruitCommandInput.RequiredGenderType.MALE_ONLY
          CreateRecruitCommandRequest.RequiredGenderType.FEMALE_ONLY -> RecruitCommandInput.RequiredGenderType.FEMALE_ONLY
          CreateRecruitCommandRequest.RequiredGenderType.OTHER -> RecruitCommandInput.RequiredGenderType.OTHER
        }
      }.toSet(),
      request.recruitedInstruments.entries.associate { e ->
        val instrumentType = when (e.key) {
          CreateRecruitCommandRequest.InstrumentType.VOCAL -> RecruitCommandInput.InstrumentType.VOCAL
          CreateRecruitCommandRequest.InstrumentType.GUITAR -> RecruitCommandInput.InstrumentType.GUITAR
          CreateRecruitCommandRequest.InstrumentType.ELECTRIC_BASE ->
            RecruitCommandInput.InstrumentType.ELECTRIC_BASE
          CreateRecruitCommandRequest.InstrumentType.DRUM -> RecruitCommandInput.InstrumentType.DRUM
          CreateRecruitCommandRequest.InstrumentType.KEY_BOARD -> RecruitCommandInput.InstrumentType.KEY_BOARD
          CreateRecruitCommandRequest.InstrumentType.PIANO -> RecruitCommandInput.InstrumentType.PIANO
          CreateRecruitCommandRequest.InstrumentType.VIOLIN -> RecruitCommandInput.InstrumentType.VIOLIN
          CreateRecruitCommandRequest.InstrumentType.OTHER -> RecruitCommandInput.InstrumentType.OTHER
        }
        instrumentType to e.value
      },
      request.memo,
      )
    val output = recruitmentCommandService.recruit(input)
    return CreateRecruitmentResponse(output.id)
  }
}

data class CreateRecruitCommandRequest(
  val owner: UUID,
  val ownerInstruments: List<InstrumentType>,
  val songTitle: String,
  val artist: String,
  val name: String,
  val genres: List<MusicGenreType>,
  val deadline: Instant,
  val requiredGenerations: Set<RequiredGenerationType>,
  val requiredGenders: Set<RequiredGenderType>,
  val recruitedInstruments: Map<InstrumentType, Short>,
  val memo: String,
) {
  enum class MusicGenreType {
    ROCK,
    J_POP,
    ANIME,
    JAZZ,
    CLASSIC,
    METAL,
    OTHER,
  }

  enum class InstrumentType {
    VOCAL,
    GUITAR,
    ELECTRIC_BASE,
    DRUM,
    KEY_BOARD,
    PIANO,
    VIOLIN,
    OTHER,
  }

  enum class RequiredGenerationType {
    TEEN,
    TWENTIES,
    THIRTIES,
    FORTIES,
    FIFTIES,
    MORE_THAN_SIXTIES,
  }

  enum class RequiredGenderType {
    MALE_ONLY,
    FEMALE_ONLY,
    OTHER,
  }
}

data class CreateRecruitmentResponse(val id: UUID)
