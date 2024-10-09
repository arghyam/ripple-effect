package org.arghyam.puddle.presentation.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.stateIn
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository

class DashboardViewModel(
    private val waterFtCalcRepo: WaterFtCalcRepository
): ViewModel() {

    private val _dashbordUiState = MutableStateFlow(DashboardUiState())
    val dashbordUiState: StateFlow<DashboardUiState> get() = _dashbordUiState



    val mWftProgress = waterFtCalcRepo.getWaterFtProgress("1ef5b01f-008f-6af0-aae7-781b2b58beb0")
        .catch { e -> e.printStackTrace() }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000), // Adjust the timeout as needed
            initialValue = emptyList()
        )

    fun onEvent(event: DashboardEvent) {


    }

}