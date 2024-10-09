package org.arghyam.puddle.data.repoImpl

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.client.request.url
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.data.dto.responses.leaderboard.LeaderboardRes
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Leaderboard
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.repository.LeaderboardRepository

class LeaderboardRepoImpl(
    private val client: HttpClient
): LeaderboardRepository {
    override suspend fun getLeaderboard(userId: String): Result<Leaderboard, DataError> {
        return try {
            val leaderboardRes = client.get {
                url("${BuildConfig.SERVER_URL}/api/leaderboard/get-leaderboard")
                parameter("userId", userId)
            }.body<LeaderboardRes>()
            Result.Success(leaderboardRes.leaderboard)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }
}