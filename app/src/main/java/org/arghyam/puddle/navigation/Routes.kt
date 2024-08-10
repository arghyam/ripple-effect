package org.arghyam.puddle.navigation

sealed class Routes(
    val route: String
) {

    data object Login: Routes("login")

    data object Register: Routes("register")

    data object ForgotPassword: Routes("forgot_password")

    data object VerifyOTP: Routes("verify_otp")

    data object ResetPassword: Routes("reset_pwd")



    data object AppGraph: Routes("app")

    data object HomeScreen: Routes("home")
    data object CalculateScreen: Routes("calculate")
    data object CalculateResultScreen: Routes("calculate_result")
    data object DiscoverScreen: Routes("discover")
    data object PlanScreen: Routes("plan")
    data object ProfileScreen: Routes("profile")

}