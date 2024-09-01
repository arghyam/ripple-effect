package org.arghyam.puddle.data.dto.responses.water_ft_calculator


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class IngredientRowItem(
    @SerialName("id")
    val id: Int,
    @SerialName("itemNo")
    val itemNo: Int,
    @SerialName("name")
    val name: String,
    @SerialName("unit")
    val unit: String,
    @SerialName("water_footprint")
    val water_footprint: String,
    @SerialName("sampleImageUrl")
    val sampleImageUrl: String,
    @SerialName("unselectedBgImageUrl")
    val unselectedBgImageUrl: String,
    @SerialName("selectedBgImageUrl")
    val selectedBgImageUrl: String,
    @SerialName("sampleImageSize")
    val sampleImageSize: Float,
    @SerialName("scaleFactor")
    val scaleFactor: Float,
    @SerialName("iconScalefactor")
    val iconScaleFactor: Float,
    @SerialName("cornerType")
    val cornerType: String,
    @SerialName("doneXOffSet")
    val doneXOffSet: Float,
    @SerialName("doneYOffSet")
    val doneYOffSet: Float,
    @SerialName("pluseXOffSet")
    val pluseXOffSet: Float,
    @SerialName("pluseYOffSet")
    val pluseYOffSet: Float,
    @SerialName("minusXOffSet")
    val minusXOffSet: Float,
    @SerialName("minusYOffSet")
    val minusYOffSet: Float,
    @SerialName("xOffset")
    val xOffset: Float,
    @SerialName("yOffset")
    val yOffset: Float

)