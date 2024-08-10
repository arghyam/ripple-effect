package org.arghyam.puddle.data.dto.responses

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class VerifyForgotPasswordOtpResponse(
    @SerialName("status_code") val status: Int,
    @SerialName("access_token") val accessToken: String? = null,
    @SerialName("message") val message: String,
)
