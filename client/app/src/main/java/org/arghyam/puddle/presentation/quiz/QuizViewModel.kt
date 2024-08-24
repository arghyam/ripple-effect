package org.arghyam.puddle.presentation.quiz

import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.arghyam.puddle.domain.models.Question
import org.arghyam.puddle.domain.models.quiz

class QuizViewModel: ViewModel() {

    private val _currentQuestionState = MutableStateFlow(QuestionState())
    val currentQuestionState: StateFlow<QuestionState> = _currentQuestionState.asStateFlow()

    var quizScore = mutableIntStateOf(0)
        private set

    //Used for sending message to UI
    private val _eventFlow: MutableSharedFlow<QuizUiEvent> = MutableSharedFlow()
    val eventFlow: SharedFlow<QuizUiEvent> = _eventFlow.asSharedFlow()

    fun onEvent(event: QuizEvent) {

        when(event) {
            is QuizEvent.SelectAnswer -> {
                _currentQuestionState.update {
                    it.copy(selectedOptionId = event.optionId)
                }
                if (currentQuestionState.value.currentQuestion.correctOptionId == event.optionId) {
                    quizScore.intValue++
                }


            }
            is QuizEvent.ShowNextQuestion -> {
                _currentQuestionState.update {
                    it.copy(currentQuestion = quiz.questionnaire[it.currentQuestion.id], selectedOptionId = null)
                }

            }
            else -> Unit

        }
    }
}