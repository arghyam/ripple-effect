package org.arghyam.puddle.data.dto.responses

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ResetPasswordResponse(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("message") val message: String
)