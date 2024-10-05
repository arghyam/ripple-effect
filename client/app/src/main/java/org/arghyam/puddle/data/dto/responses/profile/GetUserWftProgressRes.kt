package org.arghyam.puddle.data.dto.responses.profile

import kotlinx.serialization.Serializable
import org.arghyam.puddle.domain.models.DayWFT

@Serializable
data class GetUserWftProgressRes(
    val status_code: Int,
    val queryResult: List<DayWFT>,
    val message: String
)


