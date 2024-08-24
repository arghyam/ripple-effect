interface LeaderboardResponse {
    entries: LeaderboardEntry[]
    myRank: LeaderboardEntry
}



interface LeaderboardEntry {
    userId: string
    name: string
    water_footprint: number
    rank: number
}

