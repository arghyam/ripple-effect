package org.arghyam.puddle.presentation.quiz

import org.arghyam.puddle.domain.models.Question

data class QuestionState(
    val currentQuestion: Question? = null,
    val selectedOptionId: Int?= null
)
