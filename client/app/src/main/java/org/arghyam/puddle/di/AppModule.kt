package org.arghyam.puddle.di

import android.content.Context
import android.content.SharedPreferences
import io.ktor.client.HttpClient
import org.arghyam.puddle.data.repoImpl.AuthRepoImpl
import org.arghyam.puddle.data.repoImpl.LeaderboardRepoImpl
import org.arghyam.puddle.data.repoImpl.UserRepoImpl
import org.arghyam.puddle.data.repoImpl.WaterFtCalcRepoImpl
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.domain.repository.LeaderboardRepository
import org.arghyam.puddle.domain.repository.UserRepository
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.auth.LoginViewModel
import org.arghyam.puddle.presentation.auth.RegisterViewModel
import org.arghyam.puddle.presentation.leaderboard.LeaderboardViewModel
import org.arghyam.puddle.presentation.profile.ProfileViewModel
import org.arghyam.puddle.presentation.dashboard.DashboardViewModel
import org.arghyam.puddle.presentation.quiz.QuizViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.WFCOnboardViewmodel
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.utils.ktorOKHTTPClient
import org.koin.android.ext.koin.androidApplication
import org.koin.androidx.viewmodel.dsl.viewModelOf
import org.koin.dsl.module


val appModule = module {

    single<HttpClient> { ktorOKHTTPClient }

    single<SharedPreferences> { androidApplication().getSharedPreferences("puddle_app", Context.MODE_PRIVATE) }
    single<AuthRepository> { AuthRepoImpl(get(), get()) }
    single<WaterFtCalcRepository> { WaterFtCalcRepoImpl(get()) }
    single<UserRepository> { UserRepoImpl(get()) }
    single<LeaderboardRepository> { LeaderboardRepoImpl(get()) }

    viewModelOf(::LoginViewModel)
    viewModelOf(::RegisterViewModel)
    viewModelOf(::ForgotPasswordViewModel)
    viewModelOf(::WaterFtCalcViewModel)
    viewModelOf(::WFCOnboardViewmodel)
    viewModelOf(::QuizViewModel)
    viewModelOf(::ProfileViewModel)
    viewModelOf(::LeaderboardViewModel)
    viewModelOf(::DashboardViewModel)
}