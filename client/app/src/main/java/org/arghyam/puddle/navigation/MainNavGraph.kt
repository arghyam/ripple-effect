package org.arghyam.puddle.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import kotlinx.coroutines.launch
import org.arghyam.puddle.presentation.dashboard.DashboardScreen
import org.arghyam.puddle.presentation.dashboard.DashboardViewModel
import org.arghyam.puddle.presentation.discover.ArticleScreen
import org.arghyam.puddle.presentation.discover.DiscoverScreen
import org.arghyam.puddle.presentation.leaderboard.LeaderboardScreen
import org.arghyam.puddle.presentation.leaderboard.LeaderboardViewModel
import org.arghyam.puddle.presentation.profile.ProfileScreen
import org.arghyam.puddle.presentation.profile.ProfileViewModel
import org.arghyam.puddle.presentation.quiz.QuestionScreen
import org.arghyam.puddle.presentation.quiz.QuizEvent
import org.arghyam.puddle.presentation.quiz.QuizResultScreen
import org.arghyam.puddle.presentation.quiz.QuizViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.AddRecipeScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.CalculatorScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFootprintResultScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.koin.androidx.compose.navigation.koinNavViewModel

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
        startDestination = Routes.DashboardScreen.route,
        route = "Main"
    ) {

        composable(Routes.CalculateScreen.route) {

            val wfcViewModel = it.sharedViewModel<WaterFtCalcViewModel>(navController = mainNavController)
            CalculatorScreen(
                onNavigate = mainNavController::navigate,
                viewModel = wfcViewModel,

            )

        }

        composable(
            route = Routes.AddRecipeScreen.route + "?" + "recipe_id={recipe_id}",
            arguments = listOf(
                navArgument("recipe_id") {
                    type = NavType.StringType
                    nullable = false
                }
            )
            ) {

            val recipeId = it.arguments?.getString("recipe_id")



            val wfcViewModel = it.sharedViewModel<WaterFtCalcViewModel>(navController = mainNavController)

            LaunchedEffect(true) {
                if (!recipeId.isNullOrBlank()) wfcViewModel.onEvent(WaterFtCalcEvent.FetchRecipe(recipeId))
            }

            val mRecipe = wfcViewModel.currentRecipe

            if (mRecipe != null) {
                AddRecipeScreen(
                    recipe = mRecipe,
                    onIncrement = {
                        wfcViewModel.onEvent(WaterFtCalcEvent.IncrementAmt(mRecipe.id))
                    },
                    onDecrement = {
                        wfcViewModel.onEvent(WaterFtCalcEvent.DecrementAmt(mRecipe.id))
                    },
                    onChangeAmt = {amt ->
                        wfcViewModel.onEvent(WaterFtCalcEvent.ChangeAmt(mRecipe.id, amt))
                    },
                    onNavigateBack = {
                        mainNavController.popBackStack(Routes.AddRecipeScreen.route, true)
                    }
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
//              coroutineScope.launch {
//                  snackbarHostState.showSnackbar("no quiz available. this quiz is corrupt")
//              }

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

            Box(
                contentAlignment = Alignment.TopStart,
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color1)
            ) {
                Text(modifier = Modifier.padding(horizontal = 10.dp, vertical = 10.dp),
                    text = "Plan Screen", style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = puddleFontFamily,
                    fontSize = 32.sp,
                    color = Color5,
                    lineHeight = 35.2.sp
                )
                )
            }
        }

        composable(Routes.LeaderboardScreen.route) {

            val leaderboardViewModel = koinNavViewModel<LeaderboardViewModel>()
            LeaderboardScreen(leaderboardViewModel)
        }

        composable(Routes.ProfileScreen.route) {
            val profileViewModel = koinNavViewModel<ProfileViewModel>()
            ProfileScreen(
                onNavigateBack = {
                    mainNavController.popBackStack(Routes.ProfileScreen.route, true)},
                onNavigate = mainNavController::navigate,
                profileViewModel = profileViewModel
            )
        }


        composable(Routes.DashboardScreen.route) {

            val dashboardViewModel = koinNavViewModel<DashboardViewModel>()
            DashboardScreen(
                viewModel = dashboardViewModel,
                onNavigate = mainNavController::navigate
            )
        }
    }
}

