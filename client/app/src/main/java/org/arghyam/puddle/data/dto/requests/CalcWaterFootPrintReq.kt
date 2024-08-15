package org.arghyam.puddle.data.dto.requests

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class CalcWaterFootPrintReq(
    @SerialName("user_id") val userId: Int,
    @SerialName("data") val data: List<IngredientReq>
)

@Serializable
data class IngredientReq(
    @SerialName("ingredient_id") val ingredientId: Int,
    @SerialName("amt") val amount: Int
)