package org.arghyam.puddle.presentation.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.auth.events.AuthUiEvent
import org.arghyam.puddle.presentation.auth.events.ForgotPasswordEvent
import org.arghyam.puddle.presentation.auth.states.ForgotPasswordState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class ForgotPasswordViewModel(
    private val authRepo: AuthRepository
) : ViewModel() {

    private val _forgotPasswordState = MutableStateFlow(ForgotPasswordState())
    val forgotPasswordState: StateFlow<ForgotPasswordState> = _forgotPasswordState.asStateFlow()

    private val _eventFlow: MutableStateFlow<AuthUiEvent> = MutableStateFlow(AuthUiEvent.None)
    val eventFlow: StateFlow<AuthUiEvent> = _eventFlow.asStateFlow()


    fun onEvent(event: ForgotPasswordEvent) {

        when (event) {

            is ForgotPasswordEvent.OnEmailChanged -> {
                _forgotPasswordState.update {
                    it.copy(email = event.email)
                }
            }

            is ForgotPasswordEvent.OnForgotPwdOtpChanged -> {
                _forgotPasswordState.update {
                    it.copy(otp = event.otp)
                }
            }

            is ForgotPasswordEvent.OnNewPasswordChanged -> {
                _forgotPasswordState.update {
                    it.copy(newPassword = event.newPassword)
                }
            }

            is ForgotPasswordEvent.OnSendEmail -> {
                viewModelScope.launch {
                    authRepo.sendForgotPasswordOtp(email = forgotPasswordState.value.email.trim())
                        .handleResult(
                            onSuccess = { result ->

                                result?.let {
                                    _forgotPasswordState.update {
                                        it.copy(otpGenerationTimestamp = result.createdOn)
                                    }
                                    _eventFlow.emit(AuthUiEvent.ForgotPwdOtpSendSuccessful)
                                }

                            },
                            onError = {

                            }
                        )
                }
            }

            is ForgotPasswordEvent.OnResetPassword -> {
                viewModelScope.launch {
                    authRepo.resetPassword(
                        email = forgotPasswordState.value.email.trim(),
                        newPassword = forgotPasswordState.value.newPassword,
                    ).handleResult(
                        onSuccess = {
                            _eventFlow.emit(AuthUiEvent.PasswordResetSuccessful)
                        },
                        onError = {

                        }
                    )
                }
            }

            is ForgotPasswordEvent.OnVerifyForgotPwdOtp -> {
                viewModelScope.launch {

                    authRepo.verifyForgotPasswordOtp(
                        email = forgotPasswordState.value.email.trim(),
                        otpGenerationTimestamp = forgotPasswordState.value.otpGenerationTimestamp,
                        otp = forgotPasswordState.value.otp
                    ).handleResult(
                        onSuccess = {
                            _eventFlow.emit(AuthUiEvent.VerifyForgotPwdOtpSuccessful)
                        },
                        onError = {

                        }
                    )
                }
            }

            else -> Unit
        }
    }

}