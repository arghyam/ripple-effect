package org.arghyam.puddle.data.dto.responses.profile

import kotlinx.serialization.Serializable

@Serializable
data class UpdateProfileRes(
    val status_code: Int,
    val result: Boolean,
    val message: String
)
