package org.arghyam.puddle.domain.models



data class Question(
    val id: Int,
    val title: String,
    val option1: Option,
    val option2: Option,
    val option3: Option,
    val correctOptionId: Int
)


data class Option(
    val id: Int,
    val text: String
)

