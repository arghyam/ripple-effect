package org.arghyam.puddle.data.repoImpl

import android.util.Log
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.onUpload
import io.ktor.client.request.forms.formData
import io.ktor.client.request.forms.submitFormWithBinaryData
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.Headers
import io.ktor.http.HttpHeaders
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.data.dto.requests.profile.UpdateProfileReq
import org.arghyam.puddle.data.dto.responses.profile.GetProfileRes
import org.arghyam.puddle.data.dto.responses.profile.GetUserWftProgressRes
import org.arghyam.puddle.data.dto.responses.profile.UpdateProfileRes
import org.arghyam.puddle.data.dto.responses.profile.UploadPhotoResponse
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.DayWFT
import org.arghyam.puddle.domain.models.Profile
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.repository.UserRepository
import java.io.File

class UserRepoImpl(
    private val client: HttpClient
): UserRepository {


    override suspend fun updateProfileData(
        userId: String,
        name: String,
        email: String,
        phoneNumber: String,
        photoFile: File?
    ): Result<Boolean, DataError> {
        return try {

            val uploadImageRes = client.submitFormWithBinaryData(
                url = "${BuildConfig.SERVER_URL}/api/profile/upload-profile-photo",
                formData = formData {
                    append("profile-photo-file",photoFile!!.readBytes(), Headers.build {
                        append(HttpHeaders.ContentType, "image/png")
                        append(HttpHeaders.ContentDisposition, "filename=\"ktor_logo.png\"")
                    })
                }
            ) {
                parameter("userId", userId)

                onUpload { bytesSentTotal, contentLength ->
                    Log.d("TAG", "Sent $bytesSentTotal bytes from $contentLength")
                }
            }.body<UploadPhotoResponse>()

            val updateProfileDetailsRes = client.post {
                url("${BuildConfig.SERVER_URL}/api/profile/update-profile")
                parameter("userId", userId)
                setBody(
                    UpdateProfileReq(
                        name = name.ifBlank { null },
                        email = email.ifBlank { null },
                        phone_number = phoneNumber.ifBlank { null },
                        photo_url = uploadImageRes.photo_url
                    )
                )
            }.body<UpdateProfileRes>()

            Result.Success(updateProfileDetailsRes.result)


        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun fetchProfile(userId: String): Result<Profile, DataError> {
        return try {
            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/profile/get-profile")
                parameter("userId", userId)
            }.body<GetProfileRes>()

            Result.Success(res.profile_details)

        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun getUserWftProgress(
        userId: String,
        queryType: String
    ): Result<List<DayWFT>, DataError> {
        return try {
            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/user/get-user-wft-progress")
                parameter("userId", userId)
                parameter("query_type", queryType)
            }.body<GetUserWftProgressRes>()

            Result.Success(res.queryResult)

        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

}