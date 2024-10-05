package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import kotlinx.serialization.Serializable
import org.arghyam.puddle.domain.models.Recipe

@Serializable
data class GetRecipesRes(
    val status_code: Int,
    val recipes: List<Recipe>,
    val message: String
)
