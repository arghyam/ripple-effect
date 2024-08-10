package org.arghyam.puddle.data.repoImpl

import android.content.SharedPreferences
import org.arghyam.puddle.data.dto.requests.ResetPwdReq
import org.arghyam.puddle.data.dto.requests.SendForgotPwdOTPReq
import org.arghyam.puddle.data.dto.requests.SignInRequest
import org.arghyam.puddle.data.dto.requests.SignUpRequest
import org.arghyam.puddle.data.dto.requests.VerifyForgotPwdOTPReq
import org.arghyam.puddle.data.dto.responses.ResetPasswordResponse
import org.arghyam.puddle.data.dto.responses.SendForgotPwdOtpRes
import org.arghyam.puddle.data.dto.responses.VerifyForgotPasswordOtpResponse
import org.arghyam.puddle.data.dto.responses.signin.SignInResponse
import org.arghyam.puddle.data.dto.responses.signup.SignUpResponse
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.models.User
import org.arghyam.puddle.domain.repository.AuthRepository
import org.arghyam.puddle.utils.SERVER_URL
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class AuthRepoImpl(
    private val client: HttpClient,
    private val sharedPref: SharedPreferences
): AuthRepository {
    override suspend fun signIn(signInRequest: SignInRequest): Result<User, DataError> {
        return try {

            val res = client.post {
                url("$SERVER_URL/api/auth/login")
                setBody(signInRequest)
            }.body<SignInResponse>()

            val user = res.userInfo.toUser()

            Result.Success(user)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun signUp(signUpRequest: SignUpRequest): Result<Boolean, DataError> {
        return try {

            val res = client.post {
                url("$SERVER_URL/api/auth/register")
                setBody(signUpRequest)
            }.body<SignUpResponse>()

            Result.Success(res.statusCode == 200)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun sendForgotPasswordOtp(email: String): Result<SendForgotPwdOtpRes, DataError> {
        return try {

            val res = client.post {
                url("$SERVER_URL/api/auth/generate-otp")
                setBody(SendForgotPwdOTPReq(email))
            }.body<SendForgotPwdOtpRes>()

            Result.Success(res)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun verifyForgotPasswordOtp(
        email: String,
        otpGenerationTimestamp: Long,
        otp: String
    ): Result<Boolean, DataError> {
        return try {

            val res = client.post {
                url("$SERVER_URL/api/auth/verify-otp")
                setBody(VerifyForgotPwdOTPReq(email, otpGenerationTimestamp, otp))
            }

            val body= res.body<VerifyForgotPasswordOtpResponse>()
            sharedPref.edit()
                .putString("reset_password_token", body.accessToken)
                .apply()


            Result.Success(body.status == 200)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun resetPassword(
        email: String,
        newPassword: String,
    ): Result<Boolean, DataError> {
        return try {

            val accToken = sharedPref.getString("reset_password_token", "")
            val res = client.post {
                header("Authorization", "Bearer $accToken")
                url("$SERVER_URL/api/auth/reset-password")
                setBody(ResetPwdReq(email, newPassword))
            }.body<ResetPasswordResponse>()


            //remove token from storage
            if (res.statusCode == 200) {
                sharedPref.edit()
                    .remove("reset_password_token")
                    .apply()
            }


            Result.Success(res.statusCode == 200)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

}