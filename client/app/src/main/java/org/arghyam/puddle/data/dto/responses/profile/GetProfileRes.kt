package org.arghyam.puddle.data.dto.responses.profile

import kotlinx.serialization.Serializable
import org.arghyam.puddle.domain.models.Profile

@Serializable
data class GetProfileRes(
    val status_code: Int,
    val profile_details: Profile,
    val message: String
)
