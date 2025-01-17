export interface GetLeaderboardRes {
    leaderboard: Leaderboard;
    status_code: number;
    message: string;
}
  

export interface Leaderboard {
    entries: LeaderboardEntry[]
    top3Entries: LeaderboardEntry[]
    mEntry: LeaderboardEntry
}



export interface LeaderboardEntry {
    userId: string;
    name: string;
    water_footprint: number;
    rank: number;
}