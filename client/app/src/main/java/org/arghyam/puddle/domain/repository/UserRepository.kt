package org.arghyam.puddle.domain.repository

import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.DayWFT
import org.arghyam.puddle.domain.models.Profile
import org.arghyam.puddle.domain.models.Result
import java.io.File

interface UserRepository {

    suspend fun updateProfileData(
        userId: String,
        name: String = "",
        email: String= "",
        phoneNumber: String = "",
        photoFile: File? = null
    ): Result<Boolean, DataError>

    suspend fun fetchProfile(
        userId: String
    ): Result<Profile, DataError>


    suspend fun getUserWftProgress(
        userId: String,
        queryType: String
    ): Result<List<DayWFT>, DataError>

}