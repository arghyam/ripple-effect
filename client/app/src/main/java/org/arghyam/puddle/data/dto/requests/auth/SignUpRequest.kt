package org.arghyam.puddle.data.dto.requests.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignUpRequest(
    val name: String,
    val email: String,
    val password: String
)
