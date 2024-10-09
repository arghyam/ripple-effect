package org.arghyam.puddle.presentation.waterfootprint_calculator.events

import android.content.Context

sealed interface WaterFtCalcEvent {


    data class FetchRecipe(val recipeId: String): WaterFtCalcEvent

    data class IncrementAmt(val recipeId: String): WaterFtCalcEvent

    data class DecrementAmt(val recipeId: String): WaterFtCalcEvent

    data class ChangeAmt(val recipeId: String, val amt: Int): WaterFtCalcEvent

    data class OnSearchQuery(val query: String): WaterFtCalcEvent

    data object CalcWaterFootprint: WaterFtCalcEvent


}