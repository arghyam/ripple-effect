package org.arghyam.puddle.domain.models


data class MealPlanOfDay(
    val dayName: String,
    val breakfast: Recipe,
    val lunch: Recipe,
    val snack: Recipe,
    val dinner: Recipe
)
