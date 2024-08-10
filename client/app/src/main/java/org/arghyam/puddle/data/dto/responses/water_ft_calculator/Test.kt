package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import androidx.annotation.DrawableRes

data class IngredientRow2(
    val patternId: Int,
    val rowOrder: Int,
    var items: List<IngredientRowItem2>
)


enum class CornerType {
    RIGHT,
    CENTER,
    LEFT
}

data class Coordinate(
    val x: Int,
    val y: Int
)
data class IngredientRowItem2(
    val itemId: Int,
    val title: String,
    val amt: Int = 0,
    val unit: String = "g",
    @DrawableRes val unselectedResId: Int,
    @DrawableRes val selectedResId: Int,
    @DrawableRes val sampleImage: Int,
    val sampleImageSize: Float,
    val scaleFactor: Float = 1f,
    val iconScaleFactor: Float = 1f,
    val xOffset: Float,
    val yOffset: Float,
    var cornerType: CornerType,
    val doneOffSet: Coordinate = Coordinate(0,0),
    val incOffSet: Coordinate = Coordinate(0,0),
    val decOffSet: Coordinate = Coordinate(0,0)
    )

