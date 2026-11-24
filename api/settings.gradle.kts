plugins {
  // ローカルに Gradle toolchain の JDK が無い場合に自動でダウンロードする
  id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}

rootProject.name = "musiqul-api"
