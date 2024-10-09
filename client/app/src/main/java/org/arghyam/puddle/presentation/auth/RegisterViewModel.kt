package org.arghyam.puddle.presentation.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import org.arghyam.puddle.data.dto.requests.auth.SignUpRequest
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.auth.events.RegisterEvent
import org.arghyam.puddle.presentation.auth.states.RegisterState
import org.arghyam.puddle.presentation.auth.states.SignUpResState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class RegisterViewModel(
    private val authRepo: AuthRepository
) : ViewModel() {

    private val _registerState = MutableStateFlow(RegisterState())
    val registerState: StateFlow<RegisterState> = _registerState.asStateFlow()


    private val _signUpResponse = MutableStateFlow(SignUpResState())
    val signUpResponse: StateFlow<SignUpResState> = _signUpResponse.asStateFlow()


    fun onEvent(event: RegisterEvent) {

        when (event) {

            is RegisterEvent.OnNameChanged -> {
                _registerState.update {
                    it.copy(name = event.name)
                }
            }

            is RegisterEvent.OnEmailChanged -> {
                _registerState.update {
                    it.copy(email = event.email)
                }
            }

            is RegisterEvent.OnPasswordChanged -> {
                _registerState.update {
                    it.copy(password = event.password)
                }
            }

            is RegisterEvent.OnConfirmPasswordChanged -> {
                _registerState.update {
                    it.copy(confirmPassword = event.confirmPassword)
                }
            }

            is RegisterEvent.OnSignUp -> {
                viewModelScope.launch(Dispatchers.IO) {
                    _signUpResponse.update {
                        it.copy(isLoading = true)
                    }
                    authRepo.signUp(
                        SignUpRequest(
                            name = registerState.value.name,
                            email = registerState.value.email,
                            password = registerState.value.password
                        )
                    ).handleResult(
                        onSuccess = { data ->
                            _signUpResponse.update {
                                it.copy(isLoading = false, isSignupSuccessful = data)
                            }

                        },
                        onError = { error ->
                            _signUpResponse.update {
                                it.copy(isLoading = false)
                            }
                        }
                    )
                }
            }
        }
    }

}