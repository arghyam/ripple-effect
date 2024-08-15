package org.arghyam.puddle.presentation.waterfootprint_calculator.states

import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow


data class FetchIngredientsState(
    val isLoading: Boolean = false,
    val data: List<IngredientRow> = emptyList()
)
