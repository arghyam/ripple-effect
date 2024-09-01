package org.arghyam.puddle.presentation.quiz

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import org.arghyam.puddle.domain.models.Quiz
import org.arghyam.puddle.domain.models.quiz


class QuizViewModel: ViewModel() {

    private val _currentQuestionState = MutableStateFlow(QuestionState())
    val currentQuestionState: StateFlow<QuestionState> = _currentQuestionState.asStateFlow()

    var mQuiz by mutableStateOf<Quiz?>(null)
        private set

    var quizScore = mutableIntStateOf(0)
        private set

    var shouldShowResult by mutableStateOf(false)
        private set

    //Used for sending message to UI
    private val _eventFlow: MutableSharedFlow<QuizUiEvent> = MutableSharedFlow()
    val eventFlow: SharedFlow<QuizUiEvent> = _eventFlow.asSharedFlow()

    fun onEvent(event: QuizEvent) {

        when(event) {

            is QuizEvent.FetchQuiz -> {
                val quizId = event.quizId
                if (quiz.id == quizId) {
                    mQuiz = quiz
                    _currentQuestionState.update {
                        it.copy(currentQuestion = mQuiz!!.questionnaire[0])
                    }
                }


            }
            is QuizEvent.SelectAnswer -> {
                _currentQuestionState.update {
                    it.copy(selectedOptionId = event.optionId)
                }
                if (currentQuestionState.value.currentQuestion?.correctOptionId == event.optionId) {
                    quizScore.intValue++
                }


            }
            is QuizEvent.ShowNextQuestion -> {
                _currentQuestionState.update {
                    it.copy(currentQuestion = mQuiz?.questionnaire?.get(it.currentQuestion?.id!!), selectedOptionId = null)
                }

            }

            is QuizEvent.ShowQuizResult -> {
                shouldShowResult = true
            }
            else -> Unit

        }
    }
}