package org.arghyam.puddle.data.dto.requests

import kotlinx.serialization.Serializable

@Serializable
data class VerifyForgotPwdOTPReq(
    val email: String,
    val created_on: Long,
    val otp: String
)
