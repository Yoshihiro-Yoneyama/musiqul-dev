import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType
import org.jooq.meta.jaxb.Logging

plugins {
  id("org.springframework.boot") version "3.2.5"
  id("io.spring.dependency-management") version "1.1.4"
  id("nu.studer.jooq") version "8.2.3"
  kotlin("jvm") version "1.9.23"
  kotlin("plugin.spring") version "1.9.23"
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
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.projectlombok:lombok")
  // jooq
  implementation("org.springframework.boot:spring-boot-starter-jooq")
  jooqGenerator("org.postgresql:postgresql:42.5.4")
  // Arrow Kt
  implementation("io.arrow-kt:arrow-core:1.2.4")
  implementation("io.arrow-kt:arrow-fx-coroutines:1.2.4")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("io.projectreactor:reactor-test")
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs += "-Xjsr305=strict"
    jvmTarget = "21"
  }
}

tasks.withType<Test> {
  useJUnitPlatform()
}

jooq {
  version.set("3.19.1")  // default (can be omitted)
  edition.set(nu.studer.gradle.jooq.JooqEdition.OSS)  // default (can be omitted)

  configurations {
    create("main") {  // name of the jOOQ configuration
      generateSchemaSourceOnCompilation.set(true)  // default (can be omitted)

      jooqConfiguration.apply {
        logging = Logging.WARN
        jdbc.apply {
          driver = "org.postgresql.Driver"
          url = "jdbc:postgresql://localhost:34961/msqdb"
          user = "pgadmin"
          password = "pgadmin"
        }
        generator.apply {
          name = "org.jooq.codegen.KotlinGenerator"
          database.apply {
            name = "org.jooq.meta.postgres.PostgresDatabase"
            inputSchema = "musiqul"
            forcedTypes.addAll(listOf(
              ForcedType().apply {
                name = "varchar"
                includeExpression = ".*"
                includeTypes = "JSONB?"
              },
              ForcedType().apply {
                name = "varchar"
                includeExpression = ".*"
                includeTypes = "INET"
              }
            ))
          }
          generate.apply {
            isDeprecated = false
            isRecords = true
            isImmutablePojos = true
            isFluentSetters = true
          }
          target.apply {
            packageName = "nu.studer.sample"
            directory = "build/generated-src/jooq/main"  // default (can be omitted)
          }
          strategy.name = "org.jooq.codegen.DefaultGeneratorStrategy"
        }
      }
    }
  }
}