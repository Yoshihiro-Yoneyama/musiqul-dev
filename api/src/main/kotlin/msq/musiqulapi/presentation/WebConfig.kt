package msq.musiqulapi.presentation
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsWebFilter
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer


@Configuration
@EnableWebFlux
class WebConfig : WebFluxConfigurer {
  @Bean
  fun corsWebFilter(): CorsWebFilter {
    val corsConfig = CorsConfiguration()
    corsConfig.allowedOrigins = listOf("http://localhost:3000")
    corsConfig.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH")
    corsConfig.allowedHeaders = listOf("*")

    val source = UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", corsConfig)

    return CorsWebFilter(source)
  }
}