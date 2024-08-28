package org.arghyam.puddle.data.dto.responses.signin

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SignInResponse(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("access_token") val accessToken: String?,
    @SerialName("user_info") val userInfo: UserInfo?,
    @SerialName("message") val message: String
)
