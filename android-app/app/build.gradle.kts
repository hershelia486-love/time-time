plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}
android {
    namespace = "com.timetipping.compass"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.timetipping.compass"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }
    buildTypes { release { isMinifyEnabled = false; proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro") } }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    kotlinOptions { jvmTarget = "17" }
}
val syncPwaAssets by tasks.registering(Copy::class) {
    from(rootProject.projectDir.parentFile) { include("index.html", "app.js", "style.css", "service-worker.js", "manifest.webmanifest") }
    into(layout.projectDirectory.dir("src/main/assets/pwa"))
}
tasks.named("preBuild").configure { dependsOn(syncPwaAssets) }
dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
}
