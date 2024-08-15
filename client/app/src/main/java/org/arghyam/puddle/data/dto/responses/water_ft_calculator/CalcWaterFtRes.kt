package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CalcWaterFtRes(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("water_footprint") val waterFootprint: Double,
    @SerialName("message") val message: String
)
