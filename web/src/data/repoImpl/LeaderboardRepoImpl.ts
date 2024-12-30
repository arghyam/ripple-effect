import axios from "axios";
import { LeaderboardRepository } from "../../domain/repository/LeaderboardRepository";
import { LEADERBOARD_ENDPOINT } from "../../utils/Constants";
import { GetLeaderboardRes } from "../models/leaderboard/GetLeaderboardRes";



export class LeaderboardRepoImpl implements LeaderboardRepository {
    async fetchLeaderboard(userId: string): Promise<GetLeaderboardRes> {
        try {
            const response = await axios.get<GetLeaderboardRes>(`${LEADERBOARD_ENDPOINT}/get-leaderboard?userId=${userId}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    }
    
  
}
  