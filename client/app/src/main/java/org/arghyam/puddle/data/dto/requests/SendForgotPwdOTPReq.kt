package org.arghyam.puddle.data.dto.requests

import kotlinx.serialization.Serializable

@Serializable
data class SendForgotPwdOTPReq(
    val email: String
)
