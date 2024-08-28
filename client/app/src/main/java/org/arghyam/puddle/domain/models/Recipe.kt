package org.arghyam.puddle.domain.models

import androidx.annotation.DrawableRes

data class Recipe(
    val name: String,
    @DrawableRes val image: Int
)
