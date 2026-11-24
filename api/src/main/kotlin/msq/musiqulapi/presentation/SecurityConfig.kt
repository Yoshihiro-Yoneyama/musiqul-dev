package msq.musiqulapi.presentation

import msq.musiqulapi.presentation.auth.LoginAuthenticationConverter
import msq.musiqulapi.presentation.auth.LoginFailureHandler
import msq.musiqulapi.presentation.auth.LoginSuccessHandler
import msq.musiqulapi.presentation.auth.PlayerAccountAuthenticationManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint
import org.springframework.security.web.server.authentication.logout.HttpStatusReturningServerLogoutSuccessHandler
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler
import org.springframework.security.web.server.context.ServerSecurityContextRepository
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository
import org.springframework.security.web.server.csrf.CsrfWebFilter
import org.springframework.security.web.server.csrf.ServerCsrfTokenRepository
import org.springframework.security.web.server.csrf.WebSessionServerCsrfTokenRepository
import org.springframework.security.web.server.util.matcher.AndServerWebExchangeMatcher
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers

@Configuration
@EnableWebFluxSecurity
class SecurityConfig {

  @Bean
  fun csrfTokenRepository(): ServerCsrfTokenRepository = WebSessionServerCsrfTokenRepository()

  @Bean
  fun securityContextRepository(): ServerSecurityContextRepository =
    WebSessionServerSecurityContextRepository()

  @Bean
  fun securityWebFilterChain(
    http: ServerHttpSecurity,
    csrfTokenRepository: ServerCsrfTokenRepository,
    securityContextRepository: ServerSecurityContextRepository,
    authenticationManager: PlayerAccountAuthenticationManager,
    loginAuthenticationConverter: LoginAuthenticationConverter,
    loginSuccessHandler: LoginSuccessHandler,
    loginFailureHandler: LoginFailureHandler,
  ): SecurityWebFilterChain {
    val loginFilter =
      AuthenticationWebFilter(authenticationManager).apply {
        setRequiresAuthenticationMatcher(
          ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, "/api/login"),
        )
        setServerAuthenticationConverter(loginAuthenticationConverter)
        setAuthenticationSuccessHandler(loginSuccessHandler)
        setAuthenticationFailureHandler(loginFailureHandler)
      }

    return http
      .cors { }
      .csrf { csrf ->
        csrf.csrfTokenRepository(csrfTokenRepository)
        csrf.requireCsrfProtectionMatcher(
          AndServerWebExchangeMatcher(
            CsrfWebFilter.DEFAULT_CSRF_MATCHER,
            NegatedServerWebExchangeMatcher(
              ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, "/api/login"),
            ),
          ),
        )
      }.securityContextRepository(securityContextRepository)
      .addFilterAt(loginFilter, SecurityWebFiltersOrder.AUTHENTICATION)
      .authorizeExchange { auth ->
        auth.pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        auth.pathMatchers(HttpMethod.POST, "/api/login").permitAll()
        auth.anyExchange().authenticated()
      }.httpBasic { it.disable() }
      .formLogin { it.disable() }
      .logout { logout ->
        logout.requiresLogout(
          ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, "/api/logout"),
        )
        logout.logoutHandler(WebSessionServerLogoutHandler())
        logout.logoutSuccessHandler(
          HttpStatusReturningServerLogoutSuccessHandler(HttpStatus.OK),
        )
      }.exceptionHandling { exceptions ->
        exceptions.authenticationEntryPoint(
          HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED),
        )
      }.build()
  }

  @Bean
  fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
