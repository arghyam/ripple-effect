package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import kotlinx.serialization.Serializable
import org.arghyam.puddle.domain.models.Recipe

@Serializable
data class GetRecipeRes(
    val status_code: Int,
    val recipe: Recipe,
    val message: String
)
