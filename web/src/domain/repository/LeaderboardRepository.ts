import { GetLeaderboardRes } from "../../data/models/leaderboard/GetLeaderboardRes";



export interface LeaderboardRepository {
  fetchLeaderboard(userId: string): Promise<GetLeaderboardRes>;
  
}