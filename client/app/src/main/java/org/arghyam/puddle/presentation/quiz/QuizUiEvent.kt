package org.arghyam.puddle.presentation.quiz

sealed interface QuizUiEvent {


    data object NavigateToNextQuestion: QuizUiEvent
}