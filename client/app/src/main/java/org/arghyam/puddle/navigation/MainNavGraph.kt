package org.arghyam.puddle.navigation

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import kotlinx.coroutines.launch
import org.arghyam.puddle.presentation.discover.ArticleScreen
import org.arghyam.puddle.presentation.discover.DiscoverScreen
import org.arghyam.puddle.presentation.quiz.QuestionScreen
import org.arghyam.puddle.presentation.quiz.QuizEvent
import org.arghyam.puddle.presentation.quiz.QuizResultScreen
import org.arghyam.puddle.presentation.quiz.QuizViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.Test4
import org.arghyam.puddle.presentation.waterfootprint_calculator.WFCOnboard1Screen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFootprintResultScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent

@Composable
fun MainNavGraph(
    snackbarHostState: SnackbarHostState,
    rootNavController: NavHostController,
    mainNavController: NavHostController,
    scaffoldPadding: PaddingValues,
) {

    NavHost(
        modifier = Modifier.padding(scaffoldPadding),
        navController = mainNavController,
        startDestination = Routes.CalculateScreen.route,
        route = "Main"
    ) {

        composable(Routes.CalculateScreen.route) {

            val viewModel: WaterFtCalcViewModel = it.sharedViewModel(navController = mainNavController)


            if(viewModel.isWFCOnboardingCompleted.value) {
                Test4(
                    waterFtCalcViewModel = viewModel,
                    onNavigate = { route ->
                        mainNavController.navigate(route) {
                            if (route == Routes.CalculateResultScreen.route) {
                                popUpTo(Routes.CalculateScreen.route) {
                                    inclusive = true
                                }
                            }
                        }
                    }
                )
            } else {

                WFCOnboard1Screen(
                    onNextClick = { viewModel.onEvent(WaterFtCalcEvent.OnNextClicked) }
                )
            }

        }

        composable(
            route = Routes.QuizScreen.route + "?" + "quiz_id={quiz_id}",
            arguments = listOf(
                navArgument("quiz_id") {
                    type = NavType.StringType
                    nullable = false
                }
            )
        ) {

            val quizId = it.arguments?.getString("quiz_id")
            val quizViewModel = it.sharedViewModel<QuizViewModel>(navController = mainNavController)

            LaunchedEffect(key1 = true) {
                if (!quizId.isNullOrBlank()) quizViewModel.onEvent(QuizEvent.FetchQuiz(quizId))
            }

            val questionState = quizViewModel.currentQuestionState.collectAsState()
            val coroutineScope = rememberCoroutineScope()

          quizViewModel.mQuiz?.let {

              questionState.value.currentQuestion?.let { question ->
                  QuestionScreen(
                      question = question,
                      questionnaire = quizViewModel.mQuiz!!.questionnaire,
                      selectedOptionId = questionState.value.selectedOptionId,
                      onNextQuestion = {
                          quizViewModel.onEvent(QuizEvent.ShowNextQuestion)
                      },
                      onShowQuizResult = {
                          quizViewModel.onEvent(QuizEvent.ShowQuizResult)
                      },
                      onSelectOption = { id ->
                          quizViewModel.onEvent(QuizEvent.SelectAnswer(id))
                      },
                      onNavigateBack = {
                          mainNavController.navigate(Routes.DiscoverScreen.route) {
                              popUpTo(Routes.QuizScreen.route) {
                                  inclusive = true
                              }
                          }
                      }
                  )
              }?: kotlin.run {
                  coroutineScope.launch {
                      snackbarHostState.showSnackbar("no question is available. something went wrong")
                  }
              }

          }  ?: kotlin.run {
              coroutineScope.launch {
                  snackbarHostState.showSnackbar("no quiz available. this quiz is corrupt")
              }

          }


            if (quizViewModel.shouldShowResult) {
                QuizResultScreen(
                    quizScore = quizViewModel.quizScore.intValue,
                    totalQuestions = quizViewModel.mQuiz!!.questionnaire.size,
                    onNavigateBack = {
                        mainNavController.navigate(Routes.DiscoverScreen.route) {
                            popUpTo(Routes.QuizScreen.route) {
                                inclusive = true
                            }
                        }
                    }
                )
            }


        }


        composable(
            route = Routes.CalculateResultScreen.route + "?" + "water_footprint={water_footprint}",
            arguments = listOf(
                navArgument("water_footprint") {
                    type = NavType.FloatType
                    nullable = false
                }
            )
            ) {

            val waterFootPrint = it.arguments?.getFloat("water_footprint")


            waterFootPrint?.let {
                WaterFootprintResultScreen(
                    waterFootPrint = waterFootPrint,
                    onNavigate = { route ->
                        mainNavController.navigate(route) {
                            if (route == Routes.CalculateScreen.route) {
                                popUpTo(Routes.CalculateResultScreen.route) {
                                    inclusive = true
                                }
                            }
                        }
                    }
                )
            }

        }

        composable(Routes.DiscoverScreen.route) {
            DiscoverScreen(onNavigate = mainNavController::navigate)
        }

        composable(Routes.ArticleScreen.route) {
            ArticleScreen(onNavigateBack = {
                mainNavController.popBackStack(Routes.ArticleScreen.route, inclusive = true)
            })
        }


        composable(Routes.PlanScreen.route) {

        }

        composable(Routes.ProfileScreen.route) {

        }
    }
}

