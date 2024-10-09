package org.arghyam.puddle.presentation.leaderboard

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.UiComposable
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.layoutId
import org.arghyam.puddle.presentation.leaderboard.states.LeaderboardRankState

@Composable
fun LeaderboardLayout(
    modifier: Modifier = Modifier,
    userId: String,
    leaderboardRanks: List<LeaderboardRankState>,
    content: @Composable @UiComposable () -> Unit,

    ) {

    Layout(
        modifier = modifier,
        content = content
    ) { measurables, constraints ->

        val placeableList = measurables.map {

            val layoutId = it.layoutId as Int
            val layoutRow = leaderboardRanks.first { item ->
                item.rank == layoutId
            }
            Pair(layoutRow,it.measure(constraints))
        }



        val width = constraints.maxWidth
        var maxHeight = 0
        placeableList.forEach {  item ->
            if (maxHeight < item.first.offset.y) {
                maxHeight = item.first.offset.y + item.second.height
            }
        }

        maxHeight += 20

        Log.d("LeaderboardLayout", "mHeight is ${maxHeight}")

        layout(width, maxHeight) {

            placeableList.forEach { item ->

                val placeable = item.second

                val row = item.first
                val zIndex = if (row.userId == userId) 5f else 0f

                Log.d("LeaderboardLayout", "offset for ${row.rank} is ${row.offset}")
                placeable.placeRelative(row.offset.x, row.offset.y, zIndex)

            }
        }
    }

}