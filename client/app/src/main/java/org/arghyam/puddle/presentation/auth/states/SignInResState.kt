package org.arghyam.puddle.presentation.auth.states

import org.arghyam.puddle.domain.models.User

data class SignInResState(
    val isLoading: Boolean = false,
    val data: User? = null,
    val error: String? = null
)
