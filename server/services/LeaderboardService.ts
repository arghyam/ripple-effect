import { injected } from "brandi";
import { UserDAO } from "../data/dao/user/UserDAO";
import { TOKENS } from "../di/tokens";
import { logger } from "..";


export class LeaderboardService {

    constructor(private readonly dao: UserDAO) { }

    async getLeaderboard(userId: string): Promise<LeaderboardResponse> {

        const users = await this.dao.fetchUsers()

        const entries = users.map((user) => ({
            userId: user.id,
            name: user.name,
            water_footprint: user.total_water_footprint
        }))
        
        const sortedEntries = entries.sort((a, b) => a.water_footprint - b.water_footprint);

        const rankedEntries = sortedEntries.map((entry, index) => ({ ...entry, rank: index + 1 }));
        const top3Entries = rankedEntries.slice(0, 3);

        const user = await this.dao.fetchUserById(userId)

        const userRank = rankedEntries.find(entry => entry.userId === userId)?.rank || null


        const res = {
            entries: rankedEntries,
            top3Entries: top3Entries,
            mEntry: {
                userId: userId,
                name: user.name,
                water_footprint: user.total_water_footprint,
                rank: userRank
               
            }
        } as LeaderboardResponse

        return res
    }

    async calculateAndSaveLeaderboardRank(): Promise<number> {
        const users = await this.dao.fetchUsers()
        users.sort((a, b) => a.total_water_footprint - b.total_water_footprint)

        let rank = 1;
        users.forEach(user => {
            rank++
        })

        return rank
    }


}

injected(LeaderboardService, TOKENS.userDao);