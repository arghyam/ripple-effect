package org.arghyam.puddle.presentation.waterfootprint_calculator.events

sealed interface WFCOnboardEvent {

    data object OnNextClicked: WFCOnboardEvent
}