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


)