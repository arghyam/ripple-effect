package org.arghyam.puddle.presentation.auth.states

data class LoginState(
    val email: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false
)