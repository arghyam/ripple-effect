package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.content.SharedPreferences
import androidx.lifecycle.ViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WFCOnboardEvent

class WFCOnboardViewmodel(
    private val sharedPref: SharedPreferences
): ViewModel() {


    fun onEvent(event: WFCOnboardEvent) {
        when(event) {

            is WFCOnboardEvent.OnNextClicked -> {
                sharedPref.edit()
                    .putBoolean("is_wfc_onboarding_completed", true)
                    .apply()
            }
        }
    }
}