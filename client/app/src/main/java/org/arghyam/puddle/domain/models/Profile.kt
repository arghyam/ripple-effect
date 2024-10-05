package org.arghyam.puddle.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class Profile(
    val userId: String,
    val name: String,
    val email: String,
    val phone_number: String? = null,
    val photo_url: String?=null,
    val water_footprint: Int
)
