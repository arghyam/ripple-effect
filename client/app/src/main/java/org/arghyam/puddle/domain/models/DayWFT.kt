package org.arghyam.puddle.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class DayWFT(
    val dayName: String,
    val water_footprint: Double
)