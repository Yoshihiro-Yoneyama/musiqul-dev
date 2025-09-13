package msq.musiqulapi.presentation

import lombok.extern.slf4j.Slf4j
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
@Slf4j
class ExceptionHandler {
  val log: Logger = LoggerFactory.getLogger(this::class.java)

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler
  fun exception(e: Exception) {
    log.error(e.message, e)
  }
}
