package org.arghyam.puddle.presentation.waterfootprint_calculator.events

sealed interface WaterFtCalcUiEvent {

    data class WaterFootprintCalculated(val result: Double): WaterFtCalcUiEvent
    data object WaterFootprintCalculationFailed: WaterFtCalcUiEvent

    data object WFCOnboardCompleted: WaterFtCalcUiEvent
}