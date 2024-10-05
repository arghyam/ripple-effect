package org.arghyam.puddle.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class Ingredient(
    val id: String,
    val name: String,
    val unit: String,
    val quantity: String
)
