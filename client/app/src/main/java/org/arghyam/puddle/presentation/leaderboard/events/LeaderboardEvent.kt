package org.arghyam.puddle.presentation.leaderboard.events

sealed interface LeaderboardEvent {

    data object FetchLeaderboard: LeaderboardEvent
}