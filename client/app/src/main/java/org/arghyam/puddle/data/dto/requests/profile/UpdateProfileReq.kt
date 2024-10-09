package org.arghyam.puddle.data.dto.requests.profile

import kotlinx.serialization.Serializable

@Serializable
data class UpdateProfileReq(
    val name: String? = null,
    val email: String? = null,
    val phone_number: String?=null,
    val photo_url: String?=null
)
