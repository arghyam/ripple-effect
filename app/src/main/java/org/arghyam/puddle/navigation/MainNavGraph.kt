package org.arghyam.puddle.navigation

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import org.arghyam.puddle.presentation.waterfootprint_calculator.Test4
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFootprintResultScreen
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel

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
        startDestination = Routes.CalculateScreen.route
    ) {

        composable(Routes.CalculateScreen.route) {

            val viewModel: WaterFtCalcViewModel = it.sharedViewModel(navController = mainNavController)
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

        }

        composable(Routes.PlanScreen.route) {

        }

        composable(Routes.ProfileScreen.route) {

        }
    }
}

