package org.arghyam.puddle.presentation.auth.events

sealed interface RegisterEvent {

    data class OnNameChanged(val name: String): RegisterEvent
    data class OnEmailChanged(val email: String): RegisterEvent
    data class OnPasswordChanged(val password: String): RegisterEvent
    data class OnConfirmPasswordChanged(val confirmPassword: String): RegisterEvent

    data object OnSignUp: RegisterEvent
}