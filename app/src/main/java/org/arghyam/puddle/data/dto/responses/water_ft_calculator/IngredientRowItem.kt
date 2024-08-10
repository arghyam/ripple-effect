package org.arghyam.puddle.data.dto.responses.water_ft_calculator


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class IngredientRowItem(
    @SerialName("amt")
    val amt: Int,
    @SerialName("cornerType")
    val cornerType: String,
    @SerialName("createdAt")
    val createdAt: String,
    @SerialName("doneXOffSet")
    val doneXOffSet: Float,
    @SerialName("doneYOffSet")
    val doneYOffSet: Float,
    @SerialName("iconScalefactor")
    val iconScaleFactor: Float,
    @SerialName("id")
    val id: Int,
    @SerialName("itemId")
    val itemId: Int,
    @SerialName("minusXOffSet")
    val minusXOffSet: Float,
    @SerialName("minusYOffSet")
    val minusYOffSet: Float,
    @SerialName("name")
    val name: String,
    @SerialName("pluseXOffSet")
    val pluseXOffSet: Float,
    @SerialName("pluseYOffSet")
    val pluseYOffSet: Float,
    @SerialName("rowId")
    val rowId: Int,
    @SerialName("sampleImageSize")
    val sampleImageSize: Float,
    @SerialName("sampleImageUrl")
    val sampleImageUrl: String,
    @SerialName("scaleFactor")
    val scaleFactor: Float,
    @SerialName("selectedBgImageUrl")
    val selectedBgImageUrl: String,
    @SerialName("unit")
    val unit: String,
    @SerialName("unselectedBgImageUrl")
    val unselectedBgImageUrl: String,
    @SerialName("updatedAt")
    val updatedAt: String,
    @SerialName("xOffset")
    val xOffset: Float,
    @SerialName("yOffset")
    val yOffset: Float
)