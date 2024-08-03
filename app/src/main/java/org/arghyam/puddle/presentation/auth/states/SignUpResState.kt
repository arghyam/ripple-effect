package org.arghyam.puddle.presentation.auth.states

data class SignUpResState(
    val isLoading: Boolean = false,
    val isSignupSuccessful: Boolean? = null,
    val error: String? = null
)
