package msq.musiqulapi.presentation
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer

@Configuration
@EnableWebFlux
class WebConfig : WebFluxConfigurer {
  // Spring Security の `.cors {}` がこの CorsConfigurationSource ビーンを参照し、
  // 認可より前にプリフライト(OPTIONS)を処理してCORSヘッダを付与する。
  @Bean
  fun corsConfigurationSource(): CorsConfigurationSource {
    val corsConfig = CorsConfiguration()
    corsConfig.allowedOrigins = listOf("http://localhost:34963")
    corsConfig.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
    corsConfig.allowedHeaders = listOf("Content-Type", "X-CSRF-TOKEN")
    corsConfig.exposedHeaders = listOf("Set-Cookie")
    corsConfig.allowCredentials = true

    val source = UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", corsConfig)

    return source
  }
}
