package org.arghyam.puddle.presentation.auth.events

sealed interface LoginEvent {

    data class OnEmailChanged(val email: String) : LoginEvent

    data class OnPasswordChanged(val pwd: String) : LoginEvent

    data object OnLoginClicked : LoginEvent


}