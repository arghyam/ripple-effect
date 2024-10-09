package org.arghyam.puddle.data.dto.requests.auth

import kotlinx.serialization.Serializable

@Serializable
data class VerifyForgotPwdOTPReq(
    val email: String,
    val created_on: Long,
    val otp: String
)
