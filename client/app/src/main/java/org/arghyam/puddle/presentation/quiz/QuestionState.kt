package org.arghyam.puddle.presentation.quiz

import org.arghyam.puddle.domain.models.Question
import org.arghyam.puddle.domain.models.quiz

data class QuestionState(
    val currentQuestion: Question = quiz.questionnaire[0],
    val selectedOptionId: Int?= null
)
