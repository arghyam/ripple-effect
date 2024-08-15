package org.arghyam.puddle.utils

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import io.ktor.client.HttpClient
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.DefaultRequest
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.observer.ResponseObserver
import io.ktor.client.request.header
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import java.time.Duration

//OKHTTP Engine
@RequiresApi(Build.VERSION_CODES.O)
val ktorOKHTTPClient = HttpClient(OkHttp) {
    //Engine Configuration
    engine {
        // this: OkHttpConfig
        config {
            // this: OkHttpClient.Builder
            followRedirects(true)
            connectTimeout(Duration.ofMillis(30000L))
            //addInterceptor()
            //addNetworkInterceptor()

        }

    }


//    install(Auth) {
//        bearer {
//            val storedToken = "MySharedPreferences.getToken()"
//
//            loadTokens {
//                // Load tokens from storage (e.g., SharedPreferences)
//                //val storedToken = MySharedPreferences.getToken()
//                BearerTokens(accessToken = storedToken ?: "", refreshToken = "")
//            }
//
//            refreshTokens { // Optional, for refreshing expired tokens
//                val refreshTokenInfo: String = client.submitForm(
//                    url = "https://accounts.google.com/o/oauth2/token",
//                    formParameters = parameters {
//                        append("grant_type", "refresh_token")
//                        append("client_id", System.getenv("GOOGLE_CLIENT_ID"))
//                        append("refresh_token", oldTokens?.refreshToken ?: "")
//                    }
//                ) { markAsRefreshTokenRequest() }.body()
//
//                BearerTokens(accessToken = storedToken ?: "", refreshToken = "")
//            }
//        }
//
//    }

    //Content Negotiation Plugin
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            ignoreUnknownKeys = true
            //isLenient = true
        })

    }
    //Logging Plugin
    install(Logging) {
        logger = object : Logger {
            override fun log(message: String) {
                Log.v("Logger Ktor =>", message)
            }

        }
        level = LogLevel.ALL
    }
    //Response Observer Plugin
    install(ResponseObserver) {
        onResponse { response ->
            Log.d("HTTP status:", "${response.status.value}")
        }
    }
    //Default Request Plugin to provide comman configuration(e.g. headers)
    install(DefaultRequest) {
        header(HttpHeaders.ContentType, ContentType.Application.Json)
    }
}