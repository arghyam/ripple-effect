package org.arghyam.puddle.presentation.auth.states

data class ForgotPasswordState(
    val email: String = "",
    val otp: String = "",
    val newPassword: String = "",
    val otpGenerationTimestamp: Long = 0L
)
