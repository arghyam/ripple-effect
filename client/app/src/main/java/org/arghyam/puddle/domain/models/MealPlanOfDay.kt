package org.arghyam.puddle.domain.models

import org.arghyam.puddle.R

data class MealPlanOfDay(
    val dayName: String,
    val breakfast: Recipe,
    val lunch: Recipe,
    val snack: Recipe,
    val dinner: Recipe
)


val mealPlanOfWeek = listOf(
    MealPlanOfDay(
        dayName = "Sunday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),
    MealPlanOfDay(
        dayName = "Monday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.breakfast_bg
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),MealPlanOfDay(
        dayName = "Tuesday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),
    MealPlanOfDay(
        dayName = "Wednesday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),
    MealPlanOfDay(
        dayName = "Thursday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),
    MealPlanOfDay(
        dayName = "Friday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),

    MealPlanOfDay(
        dayName = "Saturday",
        breakfast = Recipe(
            "Breakfast",
            R.drawable.rava_idli
        ),
        lunch = Recipe(
            "Lunch",
            R.drawable.rava_idli
        ),
        snack = Recipe(
            "Snack",
            R.drawable.rava_idli
        ),
        dinner = Recipe(
            "Dinner",
            R.drawable.rava_idli
        )

    ),


)