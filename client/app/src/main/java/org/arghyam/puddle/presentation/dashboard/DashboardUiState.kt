package org.arghyam.puddle.presentation.dashboard

import org.arghyam.puddle.domain.models.DayWFT

data class DashboardUiState(
    val totalWaterFootprint: Double = 0.0,
    val todayWaterFootprint: Double = 0.0,
    val wftProgress: List<DayWFT> = emptyList()
)
