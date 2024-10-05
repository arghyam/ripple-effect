package org.arghyam.puddle.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class Recipe(
    val id: String,
    val name: String,
    val unit: String,
    val water_footprint: Double,
    val ingredients: List<Ingredient>,
    val createdAt: String,
    val updatedAt: String
)
