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

    data object DashboardScreen: Routes("dashboard")

    data object QuizScreen: Routes("quiz")

    data object ShowQuizResultScreen: Routes("show_quiz_result")

    data object QuestionScreen: Routes("question")
    data object CalculateScreen: Routes("calculate")
    data object CalculateResultScreen: Routes("calculate_result")
    data object DiscoverScreen: Routes("discover")
    data object ArticleScreen: Routes("article")
    data object ArticleScreen: Routes("article")
    data object PlanScreen: Routes("plan")
    data object LeaderboardScreen: Routes("leaderboard")
    data object ProfileScreen: Routes("profile")
    data object AddRecipeScreen: Routes("add_recipe")

}