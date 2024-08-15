package org.arghyam.puddle.data.dto.responses.signup

import org.arghyam.puddle.data.dto.responses.signin.UserInfo
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SignUpResponse(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("user_info") val userInfo: UserInfo?,
    @SerialName("message") val message: String
)

