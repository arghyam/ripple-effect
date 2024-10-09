package org.arghyam.puddle.data.dto.requests.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignInRequest(
    val email: String,
    val password: String
)