package org.arghyam.puddle.data.dto.requests.auth

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ResetPwdReq(
    @SerialName("email") val email: String,
    @SerialName("new_password") val newPassword: String,
)
