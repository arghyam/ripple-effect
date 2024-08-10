package org.arghyam.puddle.presentation.waterfootprint_calculator.events

sealed interface WaterFtCalcEvent {

    data object FetchIngredients: WaterFtCalcEvent

    data class Search(val query: String): WaterFtCalcEvent

    data class SelectIngredient(val id: Int): WaterFtCalcEvent

    data class DoneAndUnSelectIngredient(val id: Int): WaterFtCalcEvent

    data class ChangeAmt(val id: Int, val amt: String): WaterFtCalcEvent

    data object Complete : WaterFtCalcEvent

    data object OnDismissBottomSheet: WaterFtCalcEvent


}