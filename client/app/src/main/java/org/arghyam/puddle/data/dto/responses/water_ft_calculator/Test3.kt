package org.arghyam.puddle.data.dto.responses.water_ft_calculator


import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.UiComposable
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.layoutId

@Composable
fun LayoutOne(
    modifier: Modifier = Modifier,
    row: IngredientRow,
    selectedIngreId: Int = 0,
    content: @Composable @UiComposable () -> Unit,

) {

    Layout(
        modifier = modifier,
        content = content
    ) { measurables, constraints ->

        val placeableList = measurables.map {

            val layoutId = it.layoutId as String
            val layoutRow = row.patternItems.first { item ->
                item.name == layoutId
            }
            Pair(layoutRow,it.measure(constraints))
        }



        val width = constraints.maxWidth
        var maxHeight = 0
        placeableList.forEach {  item ->
            if (maxHeight < item.first.yOffset) {
                maxHeight = item.first.yOffset.toInt() + item.second.height
            }
        }

        maxHeight += 20

        Log.d("MAXHEIGHT IS", "this is a $maxHeight")

        layout(width, maxHeight) {

            placeableList.forEach { item ->

                val placeable = item.second

                val row = item.first
                val zIndex = if (row.id == selectedIngreId) 5f else 0f
                placeable.placeRelative(row.xOffset.toInt(), row.yOffset.toInt(), zIndex)

            }
        }
    }

}
