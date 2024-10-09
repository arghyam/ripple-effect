package org.arghyam.puddle.navigation

import android.util.Log
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.ViewModel
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import org.arghyam.puddle.presentation.auth.screens.ForgotPasswordScreen
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.auth.screens.LoginScreen
import org.arghyam.puddle.presentation.auth.LoginViewModel
import org.arghyam.puddle.presentation.auth.screens.RegisterScreen
import org.arghyam.puddle.presentation.auth.RegisterViewModel
import org.arghyam.puddle.presentation.auth.components.BottomNavBar
import org.arghyam.puddle.presentation.auth.events.AuthUiEvent
import org.arghyam.puddle.presentation.auth.screens.ResetPasswordScreen
import org.arghyam.puddle.presentation.auth.screens.VerifyOTPScreen
import kotlinx.coroutines.flow.collectLatest
import org.koin.androidx.compose.koinViewModel

@Composable
fun RootNavGraph(
    navController: NavHostController = rememberNavController(),
    startDestination: String = Routes.Login.route
) {

    NavHost(navController = navController, startDestination = startDestination, route = "root") {


        composable(Routes.Login.route) {

            val viewModel: LoginViewModel = koinViewModel()

            LoginScreen(
                onNavigate = { route ->
                    navController.navigate(route)
                },
                authViewModel = viewModel
            )
        }

        composable(Routes.Register.route) {
            val viewModel: RegisterViewModel = koinViewModel()

            RegisterScreen(
                registerViewModel = viewModel,
                onNavigate = {
                    navController.navigate(it) {
                        popUpTo(Routes.Register.route) {
                            inclusive = true
                        }
                    }
                }
            )
        }

        composable(Routes.ForgotPassword.route) {

            val forgotPasswordViewModel: ForgotPasswordViewModel = it.sharedViewModel(navController = navController)

            LaunchedEffect(key1 = true) {
                forgotPasswordViewModel.eventFlow.collectLatest { uiEvent ->
                    when(uiEvent) {
                        is AuthUiEvent.ForgotPwdOtpSendSuccessful -> {
                            navController.navigate(Routes.VerifyOTP.route)
                        }
                        is AuthUiEvent.VerifyForgotPwdOtpSuccessful -> {

                        }
                        is AuthUiEvent.PasswordResetSuccessful -> {

                        }
                        else -> Unit
                    }
                }
            }

            ForgotPasswordScreen(
                forgotPasswordViewModel = forgotPasswordViewModel,
                onNavigate = navController::navigate
            )
        }

        composable(Routes.VerifyOTP.route) {

            val forgotPasswordViewModel: ForgotPasswordViewModel = it.sharedViewModel(navController = navController)

            LaunchedEffect(key1 = true) {
                forgotPasswordViewModel.eventFlow.collectLatest { uiEvent ->
                    when(uiEvent) {
                        is AuthUiEvent.ForgotPwdOtpSendSuccessful -> {

                        }
                        is AuthUiEvent.VerifyForgotPwdOtpSuccessful -> {
                            navController.navigate(Routes.ResetPassword.route)
                        }
                        is AuthUiEvent.PasswordResetSuccessful -> {

                        }
                        else -> Unit
                    }
                }
            }

            VerifyOTPScreen(
                forgotPwdViewModel = forgotPasswordViewModel,
                onNavigate = navController::navigate
            )
        }

        composable(Routes.ResetPassword.route) {

            val forgotPasswordViewModel: ForgotPasswordViewModel = it.sharedViewModel(navController = navController)

            LaunchedEffect(key1 = true) {
                forgotPasswordViewModel.eventFlow.collectLatest { uiEvent ->
                    when(uiEvent) {
                        is AuthUiEvent.ForgotPwdOtpSendSuccessful -> {

                        }
                        is AuthUiEvent.VerifyForgotPwdOtpSuccessful -> {

                        }
                        is AuthUiEvent.PasswordResetSuccessful -> {
                            navController.navigate(Routes.Login.route)
                        }
                        else -> Unit
                    }
                }
            }

            ResetPasswordScreen(
                forgotPwdViewModel = forgotPasswordViewModel,
                onNavigate = navController::navigate
            )
        }

        composable(Routes.AppGraph.route) {

            val mainNavController = rememberNavController()
            val navBackStackEntry by mainNavController.currentBackStackEntryAsState()
            val snackbarHostState = remember { SnackbarHostState() }

            Scaffold(
                modifier = Modifier
                    .fillMaxSize(),
                snackbarHost = {
                    SnackbarHost(hostState = snackbarHostState)
                },
            ) { scaffPd ->


                Box(modifier = Modifier.fillMaxSize()) {


                    MainNavGraph(
                        snackbarHostState = snackbarHostState,
                        rootNavController = navController,
                        mainNavController = mainNavController,
                        scaffoldPadding = scaffPd,
                    )

                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.BottomCenter) {

                        val routeList = listOf(
                            "${Routes.AddRecipeScreen.route}?recipe_id={recipe_id}",
                            Routes.ProfileScreen.route,
                            Routes.CalculateScreen.route,
                            Routes.CalculateResultScreen.route
                        )
                        val currentRoute = navBackStackEntry?.destination?.route

                        val isMatchFound = routeList.any {
                            it == currentRoute
                        }

                        BottomNavBar(
                            modifier = Modifier,
                            currentRoute = currentRoute,
                            isVisible = !isMatchFound,
                            onNavigate = mainNavController::navigate
                        )
                    }
                }

            }
        }



    }
}



@Composable
inline fun <reified T : ViewModel> NavBackStackEntry.sharedViewModel(navController: NavController): T {
    Log.d("RootNavGraph", "parent destination is: ${destination.parent?.route}")
    val navGraphRoute = destination.parent?.route ?: return koinViewModel<T>()
    val parentEntry = remember(this) {
        navController.getBackStackEntry(navGraphRoute)
    }

    Log.d("RootNavGraph", "parent navbackstackentry is: ${parentEntry}")


    return koinViewModel<T>(viewModelStoreOwner = parentEntry)
}