package org.arghyam.puddle.presentation.waterfootprint_calculator.states

import androidx.compose.runtime.Stable

@Stable
data class IngredientCalcState(
    val id: Int,
    val name: String,
    val unit: String,
    val category: String,
    val amt: String = "", // Fill-up by users
)
