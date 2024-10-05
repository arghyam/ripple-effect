package org.arghyam.puddle.presentation.leaderboard.states

import androidx.annotation.DrawableRes
import androidx.compose.ui.unit.IntOffset
import org.arghyam.puddle.R


data class LeaderboardLayoutState(
    val topFiveRanks: List<LeaderboardRankState> = leaderboardRankList,
    val mRank: LeaderboardRankState = LeaderboardRankState()
)
data class LeaderboardRankState(
    val userId: String = "",
    val name: String = "",
    val waterFootprint: Int = 0,
    val rank: Int = 0,
    val offset: IntOffset = IntOffset.Zero,
    val rotation: Float = 0f,
    @DrawableRes val bgRank: Int?=null,
    @DrawableRes val bgImage: Int?=null,
    @DrawableRes val selectedBgImage: Int?=null,
)

val leaderboardRankList = listOf(
    LeaderboardRankState(
        rank = 1,
        bgImage = R.drawable.rank_1_bg,
        selectedBgImage = R.drawable.selected_rank_1_bg,
        offset = IntOffset(0,0)
    ),
    LeaderboardRankState(
        rank = 2,
        bgImage = R.drawable.rank_2_bg,
        selectedBgImage = R.drawable.selected_rank_2_bg,
        offset = IntOffset(500,100)
    ),
    LeaderboardRankState(
        rank = 3,
        bgImage = R.drawable.rank_3_bg,
        selectedBgImage = R.drawable.selected_rank_3_bg,
        offset = IntOffset(-30,400)
    ),
    LeaderboardRankState(
        rank = 4,
        bgImage = R.drawable.rank_4_bg,
        selectedBgImage = R.drawable.selected_rank_4_bg,
        offset = IntOffset(450,520)
    ),
    LeaderboardRankState(
        rank = 5,
        bgImage = R.drawable.rank_5_bg,
        selectedBgImage = R.drawable.selected_rank_5_bg,
        offset = IntOffset(30,780)
    )
)
