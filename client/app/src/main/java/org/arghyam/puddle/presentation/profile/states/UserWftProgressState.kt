package org.arghyam.puddle.presentation.profile.states

import org.arghyam.puddle.domain.models.DayWFT

data class UserWftProgressState(
    val isLoading: Boolean = false,
    val data: List<DayWFT> = listOf()
)
