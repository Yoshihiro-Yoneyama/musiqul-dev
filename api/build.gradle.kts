import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType
import org.jooq.meta.jaxb.Logging

plugins {
  id("org.springframework.boot") version "3.4.3"
  id("io.spring.dependency-management") version "1.1.7"
  id("nu.studer.jooq") version "10.1"
  kotlin("jvm") version "2.1.21"
  kotlin("plugin.spring") version "2.1.21"
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
  implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.projectlombok:lombok")
  implementation("org.postgresql:postgresql")
  // jooq
  implementation("org.springframework.boot:spring-boot-starter-jooq")
  jooqGenerator("org.postgresql:postgresql:42.5.4")
  // Arrow Kt
  implementation("io.arrow-kt:arrow-core:2.0.0-rc.1")
  implementation("io.arrow-kt:arrow-fx-coroutines:2.0.0-rc.1")
  // test
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("io.projectreactor:reactor-test")
  testImplementation("org.junit.jupiter:junit-jupiter-api")
  testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
  testImplementation("org.mockito.kotlin:mockito-kotlin:5.4.0")
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


// 以下のコマンドはmusiqul-apiを起動する場合はコメントアウトを外す
// generateJooqを実行する場合はコメントアウトする
project.gradle.startParameter.excludedTaskNames.add("generatejooq")

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
            inputSchema = "musiqul_command"
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
            directory = "jooq/generated-src/jooq/main"  // default (can be omitted)
          }
          strategy.name = "org.jooq.codegen.DefaultGeneratorStrategy"
        }
      }
    }
  }
}