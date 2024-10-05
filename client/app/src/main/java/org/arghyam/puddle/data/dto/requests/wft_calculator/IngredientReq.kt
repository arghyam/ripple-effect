package org.arghyam.puddle.data.dto.requests.wft_calculator

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class IngredientReq(
    @SerialName("ingredient_id") val ingredientId: Int,
    @SerialName("amt") val amount: Int
)