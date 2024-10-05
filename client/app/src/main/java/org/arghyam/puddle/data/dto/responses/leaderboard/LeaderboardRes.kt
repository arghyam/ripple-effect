package org.arghyam.puddle.data.dto.responses.leaderboard

import kotlinx.serialization.Serializable
import org.arghyam.puddle.domain.models.Leaderboard

@Serializable
data class LeaderboardRes(
    val status_code: Int,
    val leaderboard: Leaderboard,
    val message: String
)


