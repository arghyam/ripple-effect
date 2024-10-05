package org.arghyam.puddle.domain.repository

import org.arghyam.puddle.data.dto.requests.auth.SignInRequest
import org.arghyam.puddle.data.dto.requests.auth.SignUpRequest
import org.arghyam.puddle.data.dto.responses.SendForgotPwdOtpRes
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.models.User

interface AuthRepository {

    suspend fun signIn(
        signInRequest: SignInRequest
    ): Result<User, DataError>

    suspend fun signUp(
        signUpRequest: SignUpRequest
    ): Result<Boolean, DataError>

    suspend fun sendForgotPasswordOtp(
        email: String
    ): Result<SendForgotPwdOtpRes, DataError>

    suspend fun verifyForgotPasswordOtp(
        email: String,
        otpGenerationTimestamp: Long,
        otp: String
    ): Result<Boolean, DataError>

    suspend fun resetPassword(
        email: String,
        newPassword: String,
    ): Result<Boolean, DataError>
}