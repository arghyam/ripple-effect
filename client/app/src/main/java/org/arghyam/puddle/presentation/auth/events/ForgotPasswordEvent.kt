package org.arghyam.puddle.presentation.auth.events

sealed interface ForgotPasswordEvent {

    data class OnEmailChanged(val email: String): ForgotPasswordEvent

    data class OnForgotPwdOtpChanged(val otp: String): ForgotPasswordEvent

    data class OnNewPasswordChanged(val newPassword: String): ForgotPasswordEvent

    data object OnSendEmail: ForgotPasswordEvent

    data object OnVerifyForgotPwdOtp: ForgotPasswordEvent

    data object OnResetPassword: ForgotPasswordEvent
}