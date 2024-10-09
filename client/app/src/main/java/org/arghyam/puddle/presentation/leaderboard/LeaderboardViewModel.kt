package org.arghyam.puddle.presentation.leaderboard

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.arghyam.puddle.domain.repository.LeaderboardRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.leaderboard.events.LeaderboardEvent
import org.arghyam.puddle.presentation.leaderboard.states.LeaderboardLayoutState

class LeaderboardViewModel(
    private val leaderboardRepo: LeaderboardRepository
): ViewModel() {

    private val _leaderboardLayoutState = MutableStateFlow(LeaderboardLayoutState())
    val leaderboardLayoutState: StateFlow<LeaderboardLayoutState> = _leaderboardLayoutState.asStateFlow()


    fun onEvent(event: LeaderboardEvent) {

        when(event) {

            is LeaderboardEvent.FetchLeaderboard -> {
                viewModelScope.launch {
                    leaderboardRepo.getLeaderboard("1ef5b01f-008f-6af0-aae7-781b2b58beb0")
                        .handleResult(
                            onSuccess = { leaderboard ->
                                leaderboard?.let {


                                    _leaderboardLayoutState.update { lbState ->

                                        val mTopFiveRanksList = lbState.topFiveRanks.map { rankState ->
                                            val entry = it.entries.singleOrNull { entry ->
                                                entry.rank == rankState.rank
                                            }


                                            if (entry != null) {
                                                rankState.copy(
                                                    userId = entry.userId,
                                                    name = entry.name,
                                                    waterFootprint = entry.water_footprint,
                                                )
                                            } else {
                                                rankState.copy(
                                                    name = "No\nUser",

                                                )
                                            }
                                        }

                                        lbState.copy(
                                            topFiveRanks = mTopFiveRanksList,
                                            mRank = lbState.mRank.copy(
                                                userId = it.mEntry.userId,
                                                name = it.mEntry.name,
                                                waterFootprint = it.mEntry.water_footprint,
                                                rank = it.mEntry.rank
                                            )
                                        )

                                    }

                                }
                            }
                        )
                }
            }
        }
    }

}