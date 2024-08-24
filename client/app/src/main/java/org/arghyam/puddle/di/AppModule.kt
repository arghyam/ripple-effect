package org.arghyam.puddle.di

import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import androidx.annotation.RequiresApi
import org.arghyam.puddle.data.repoImpl.AuthRepoImpl
import org.arghyam.puddle.data.repoImpl.WaterFtCalcRepoImpl
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.utils.ktorOKHTTPClient
import org.arghyam.puddle.presentation.auth.LoginViewModel
import org.arghyam.puddle.presentation.auth.RegisterViewModel
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.presentation.waterfootprint_calculator.WFCOnboardViewmodel
import org.arghyam.puddle.presentation.quiz.QuizViewModel
import io.ktor.client.HttpClient
import org.koin.android.ext.koin.androidApplication
import org.koin.androidx.viewmodel.dsl.viewModelOf
import org.koin.dsl.module

@RequiresApi(Build.VERSION_CODES.O)
val appModule = module {

    single<HttpClient> { ktorOKHTTPClient }

    single<SharedPreferences> { androidApplication().getSharedPreferences("puddle_app", Context.MODE_PRIVATE) }
    single<AuthRepository> { AuthRepoImpl(get(), get()) }
    single<WaterFtCalcRepository> { WaterFtCalcRepoImpl(get()) }

    viewModelOf(::LoginViewModel)
    viewModelOf(::RegisterViewModel)
    viewModelOf(::ForgotPasswordViewModel)
    viewModelOf(::WaterFtCalcViewModel)
    viewModelOf(::WFCOnboardViewmodel)
    viewModelOf(::QuizViewModel)
}