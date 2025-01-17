package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class FetchIngredientsRes(
    @SerialName("status_code") val statusCode: Int,
    @SerialName("data") val data: List<IngredientRow>,
    @SerialName("message") val message: String
)

@Serializable
data class IngredientRow(
    @SerialName("patternId") val patternId: Int,
    @SerialName("rank") val rank: Int,
    @SerialName("patternItems") val patternItems: List<IngredientRowItem>
)


