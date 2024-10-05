package org.arghyam.puddle.data.dto.responses.profile

import kotlinx.serialization.Serializable

@Serializable
data class UploadPhotoResponse(
    val status_code: Int,
    val photo_url: String,
    val message: String
)
