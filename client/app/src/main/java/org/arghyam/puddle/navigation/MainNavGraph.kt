package org.arghyam.puddle.navigation

import android.content.SharedPreferences
import android.util.Log
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import kotlinx.coroutines.flow.collectLatest
import org.arghyam.puddle.domain.models.quiz
import org.arghyam.puddle.presentation.discover.ArticleScreen
import org.arghyam.puddle.presentation.discover.DiscoverScreen
import org.arghyam.puddle.presentation.quiz.QuestionScreen
import org.arghyam.puddle.presentation.quiz.QuizEvent
import org.arghyam.puddle.presentation.quiz.QuizResultScreen
import org.arghyam.puddle.presentation.quiz.QuizUiEvent
import org.arghyam.puddle.presentation.quiz.QuizViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.Test4
import org.arghyam.puddle.presentation.waterfootprint_calculator.WFCOnboard1Screen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFootprintResultScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.koin.compose.koinInject

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
        startDestination = Routes.QuizScreen.route,
        route = "Main"
    ) {

        composable(Routes.CalculateScreen.route) {

            val viewModel: WaterFtCalcViewModel = it.sharedViewModel(navController = mainNavController)

            val sharedPref = koinInject<SharedPreferences>()

            var wfcOnboardingStatus = sharedPref.getBoolean("is_wfc_onboarding_completed", false)

            LaunchedEffect(key1 = true) {
                viewModel.eventFlow.collectLatest { event ->
                    when(event) {
                        is WaterFtCalcUiEvent.WFCOnboardCompleted -> {
                            wfcOnboardingStatus = true
                            Log.d("MAINNAVG", "wfconboardi")
                        }
                        else -> Unit
                    }
                }
            }

            if(wfcOnboardingStatus) {
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

        composable(route = Routes.QuizScreen.route) {

            Box(modifier = Modifier.fillMaxSize()) {
                Button(onClick = { mainNavController.navigate(Routes.QuestionScreen.route) }) {
                    Text(text = "Start Quiz")
                }
            }
        }

        composable(
            route = Routes.QuestionScreen.route
        ) {


            val quizViewModel = it.sharedViewModel<QuizViewModel>(navController = mainNavController)
            val questionState = quizViewModel.currentQuestionState.collectAsState()


            QuestionScreen(
                questionState = questionState.value,
                onNextQuestion = {
                    quizViewModel.onEvent(QuizEvent.ShowNextQuestion)
                },
                onShowQuizResult = {
                    mainNavController.navigate(Routes.ShowQuizResultScreen.route)
                },
                onSelectOption = { id ->
                    quizViewModel.onEvent(QuizEvent.SelectAnswer(id))
                },
                onNavigateBack = {
                    mainNavController.navigate(Routes.DiscoverScreen.route) {
                        popUpTo(Routes.QuestionScreen.route) {
                            inclusive = true
                        }
                    }
                }
            )

        }

        composable(Routes.ShowQuizResultScreen.route) {
            val quizViewModel = it.sharedViewModel<QuizViewModel>(navController = mainNavController)

            QuizResultScreen(
                quizScore = quizViewModel.quizScore.intValue,
                totalQuestions = quiz.questionnaire.size,
                onNavigateBack = {
                    mainNavController.navigate(Routes.DiscoverScreen.route) {
                        popUpTo(Routes.ShowQuizResultScreen.route) {
                            inclusive = true
                        }
                    }
                }
            )
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

