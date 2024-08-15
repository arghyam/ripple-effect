package org.arghyam.puddle.data.dto.responses.water_ft_calculator


import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.UiComposable
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.layoutId

@Composable
fun LayoutOne(
    modifier: Modifier = Modifier,
    height: Int = 850,
    row: IngredientRow,
    content: @Composable @UiComposable () -> Unit,
) {

    Layout(
        modifier = modifier,
        content = content
    ) { measurables, constraints ->

        val placeableList = measurables.map {

            val layoutId = it.layoutId as String
            val layoutRow = row.items.first { item ->
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

        layout(width, maxHeight) {

            placeableList.forEach { item ->

                val placeable = item.second

                val row = item.first
                placeable.placeRelative(row.xOffset.toInt(), row.yOffset.toInt())


            }
        }
    }

}
