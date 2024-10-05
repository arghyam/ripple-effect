package org.arghyam.puddle.data.dto.requests.wft_calculator

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CalcWaterFootPrintReq(
    @SerialName("user_id") val userId: String,
    @SerialName("data") val data: List<IngredientReq>
)

