interface LeaderboardResponse {
    entries: LeaderboardEntry[]
    mEntry: LeaderboardEntry
}



interface LeaderboardEntry {
    userId: string
    name: string
    water_footprint: number
    rank: number
}

