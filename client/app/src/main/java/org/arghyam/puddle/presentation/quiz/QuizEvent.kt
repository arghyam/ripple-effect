package org.arghyam.puddle.presentation.quiz

sealed interface QuizEvent {


    data class FetchQuiz(val quizId: String): QuizEvent

    data object ShowQuizResult: QuizEvent
    data object ShowNextQuestion: QuizEvent

    data class SelectAnswer(val optionId: Int): QuizEvent

}