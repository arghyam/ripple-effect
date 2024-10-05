package org.arghyam.puddle.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class Leaderboard(
    val entries: List<LeaderboardEntry>,
    val mEntry: LeaderboardEntry
)

@Serializable
data class LeaderboardEntry(
    val userId: String,
    val name: String,
    val water_footprint: Int,
    val rank: Int
)