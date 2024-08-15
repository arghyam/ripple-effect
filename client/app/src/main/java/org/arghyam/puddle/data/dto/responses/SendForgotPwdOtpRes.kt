package org.arghyam.puddle.data.dto.responses

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable


@Serializable
data class SendForgotPwdOtpRes(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("created_on") val createdOn: Long,
    @SerialName("message") val message: String
)