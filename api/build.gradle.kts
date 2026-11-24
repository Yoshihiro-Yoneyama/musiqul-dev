import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType

plugins {
  id("org.springframework.boot") version "4.2.0"
  id("io.spring.dependency-management") version "1.1.7"
  id("nu.studer.jooq") version "10.1"

  id("com.diffplug.spotless") version "8.12.0"
  kotlin("jvm") version "2.4.21"
  kotlin("plugin.spring") version "2.4.21"
  java
}

group = "msq"
version = "0.0.1-SNAPSHOT"

java {
  sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
  mavenCentral()
}

dependencies {
  // Spring Boot 4 では Jackson 3 (groupId: tools.jackson) を使う
  implementation("tools.jackson.module:jackson-module-kotlin")
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.projectlombok:lombok")
  implementation("org.postgresql:postgresql:42.7.7")
  // jooq
  implementation("org.springframework.boot:spring-boot-starter-jooq")
  jooqGenerator("org.postgresql:postgresql:42.7.7")
  // Arrow Kt
  implementation("io.arrow-kt:arrow-core:2.0.0-rc.1")
  implementation("io.arrow-kt:arrow-fx-coroutines:2.0.0-rc.1")
  // test
  // Spring Boot 4 では技術ごとのテスト用スターターを使う (いずれも spring-boot-starter-test を含む)
  testImplementation("org.springframework.boot:spring-boot-starter-webflux-test")
  testImplementation("org.springframework.boot:spring-boot-starter-security-test")
  testImplementation("org.springframework.boot:spring-boot-starter-jooq-test")
  testImplementation("io.projectreactor:reactor-test")
  testImplementation("org.junit.jupiter:junit-jupiter-api")
  testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  testImplementation("org.mockito.kotlin:mockito-kotlin:5.4.0")
  // Testcontainers (2.x でアーティファクト名に testcontainers- が付いた。バージョンは Spring Boot の BOM で管理)
  testImplementation("org.testcontainers:testcontainers")
  testImplementation("org.testcontainers:testcontainers-postgresql")
  testImplementation("org.testcontainers:testcontainers-junit-jupiter")
}

tasks.withType<KotlinCompile> {
  compilerOptions {
    freeCompilerArgs.add("-Xjsr305=strict")
    jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21)
  }
}

tasks.withType<Test> {
  useJUnitPlatform()
}

spotless {
  kotlin {
    target("src/**/*.kt")
    targetExclude("jooq/generated-src/**/*.kt", "src/main/kotlin/msq/musiqulapi/presentation/command/collab/recruit/create/CreateRecruitmentController.kt")
    ktlint("1.8.0").editorConfigOverride(
      mapOf(
        "max_line_length" to "100",

        "indent_size" to "2",
        "ktlint_standard_package-name" to "disabled",
        "ktlint_standard_no-wildcard-imports" to "disabled",
        "ktlint_standard_no-empty-file" to "disabled",
        "ktlint_standard_parameter-list-wrapping" to "enabled",
        "ktlint_standard_argument-list-wrapping" to "enabled",
        "ktlint_standard_chain-method-continuation" to "enabled",
        "ktlint_standard_multiline-expression-wrapping" to "enabled",
      ),
    )
    trimTrailingWhitespace()
  }
  kotlinGradle {
    target("*.gradle.kts")
    ktlint("1.8.0").editorConfigOverride(
      mapOf(
        "indent_size" to "2",
      ),
    )
    trimTrailingWhitespace()
    endWithNewline()
  }
}

jooq {
  version.set("3.19.19")
  configurations {
    create("main") {
      generateSchemaSourceOnCompilation.set(false)
      jooqConfiguration.apply {
        jdbc.apply {
          driver = project.property("jooq.db.driver") as String
          url = project.property("jooq.db.url") as String
          user = project.property("jooq.db.user") as String
          password = project.property("jooq.db.password") as String
        }
        generator.apply {
          name = "org.jooq.codegen.KotlinGenerator"
          database.apply {
            name = "org.jooq.meta.postgres.PostgresDatabase"
            inputSchema = project.property("jooq.schema") as String
            forcedTypes.addAll(
              listOf(
                ForcedType().apply {
                  name = "varchar"
                  includeExpression = ".*"
                  includeTypes = "JSONB?"
                },
                ForcedType().apply {
                  name = "varchar"
                  includeExpression = ".*"
                  includeTypes = "INET"
                },
              ),
            )
          }
          target.apply {
            packageName = project.property("jooq.package") as String
            directory = project.property("jooq.directory") as String
          }
        }
      }
    }
  }
}
