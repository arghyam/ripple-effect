interface LeaderboardResponse {
    top3Entries: LeaderboardEntry[]
    entries: LeaderboardEntry[]
    mEntry: LeaderboardEntry
}



interface LeaderboardEntry {
    userId: string
    name: string
    water_footprint: number
    rank: number
}

