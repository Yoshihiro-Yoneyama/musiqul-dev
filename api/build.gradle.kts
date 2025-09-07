import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jooq.meta.jaxb.ForcedType

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
  // Testcontainers
  testImplementation("org.testcontainers:testcontainers")
  testImplementation("org.testcontainers:postgresql")
  testImplementation("org.testcontainers:junit-jupiter")
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
          target.apply {
            packageName = project.property("jooq.package") as String
            directory = project.property("jooq.directory") as String
          }
        }
      }
    }
  }
}