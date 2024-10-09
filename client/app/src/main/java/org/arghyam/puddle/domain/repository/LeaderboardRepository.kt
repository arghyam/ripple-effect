package org.arghyam.puddle.domain.repository

import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Leaderboard
import org.arghyam.puddle.domain.models.Result

interface LeaderboardRepository {

    suspend fun getLeaderboard(
        userId: String
    ): Result<Leaderboard, DataError>
}