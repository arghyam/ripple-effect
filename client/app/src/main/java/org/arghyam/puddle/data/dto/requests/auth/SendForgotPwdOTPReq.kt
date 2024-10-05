package org.arghyam.puddle.data.dto.requests.auth

import kotlinx.serialization.Serializable

@Serializable
data class SendForgotPwdOTPReq(
    val email: String
)
