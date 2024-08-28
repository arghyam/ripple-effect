package org.arghyam.puddle.presentation.auth

import android.content.SharedPreferences
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import org.arghyam.puddle.data.dto.requests.SignInRequest
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.auth.events.LoginEvent
import org.arghyam.puddle.presentation.auth.events.AuthUiEvent
import org.arghyam.puddle.presentation.auth.states.LoginState
import org.arghyam.puddle.presentation.auth.states.SignInResState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class LoginViewModel(
    private val authRepo: AuthRepository,
    private val sharedPref: SharedPreferences
) : ViewModel() {


    private val _eventFlow: MutableStateFlow<AuthUiEvent> = MutableStateFlow(AuthUiEvent.None)
    val eventFlow: StateFlow<AuthUiEvent> = _eventFlow.asStateFlow()

    private val _loginState = MutableStateFlow(LoginState())
    val loginState: StateFlow<LoginState> = _loginState.asStateFlow()


    private val _signInResponse = MutableStateFlow(SignInResState())
    val signInResponse: StateFlow<SignInResState> = _signInResponse.asStateFlow()




    fun onEvent(event: LoginEvent) {


        when (event) {

            is LoginEvent.OnEmailChanged -> {
                _loginState.update {
                    it.copy(email = event.email)
                }
            }

            is LoginEvent.OnPasswordChanged -> {
                _loginState.update {
                    it.copy(password = event.pwd)
                }
            }

            is LoginEvent.OnLoginClicked -> {
                viewModelScope.launch(Dispatchers.IO) {
                    _signInResponse.update {
                        it.copy(isLoading = true)
                    }
                    authRepo.signIn(SignInRequest(loginState.value.email, loginState.value.password))
                        .handleResult(
                            onSuccess = { user ->
                                _signInResponse.update {
                                    it.copy(isLoading = false, data = user)
                                }

                                //store user data
                                sharedPref.edit()
                                    .putString("userId", user?.id)
                                    .putString("name", user?.name)
                                    .apply()

                                _eventFlow.emit(AuthUiEvent.LoginUserSuccessful)

                            },
                            onError = { error ->
                                _signInResponse.update {
                                    it.copy(isLoading = false)
                                }

                                _eventFlow.emit(AuthUiEvent.LoginUserFailed)
                            }
                        )
                }
            }

        }
    }
}



