package org.arghyam.puddle.presentation.auth.events

sealed interface AuthUiEvent{
    data object None : AuthUiEvent

    data object LoginUserSuccessful: AuthUiEvent
    data object LoginUserFailed: AuthUiEvent
    data object RegisterUserSuccessful: AuthUiEvent

    data object ForgotPwdOtpSendSuccessful: AuthUiEvent
    data object VerifyForgotPwdOtpSuccessful: AuthUiEvent
    data object PasswordResetSuccessful: AuthUiEvent

}