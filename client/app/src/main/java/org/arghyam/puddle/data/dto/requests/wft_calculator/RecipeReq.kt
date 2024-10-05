package org.arghyam.puddle.data.dto.requests.wft_calculator

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class RecipeReq(
    @SerialName("recipe_id") val recipeId: String,
    @SerialName("amt") val amount: Int
)