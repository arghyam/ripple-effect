import { injected } from "brandi";
import { UserDAO } from "../data/dao/user/UserDAO";
import { TOKENS } from "../di/tokens";


export class LeaderboardService {

    constructor(private readonly dao: UserDAO) { }

    async getLeaderboard(userId: string): Promise<LeaderboardResponse> {

        const users = await this.dao.fetchUsers()

        const entries = users.map((user) => ({
            userId: user.id,
            name: user.name,
            water_footprint: user.total_water_footprint
        }))

        const user = await this.dao.fetchUserById(userId)


        const res = {
            entries: entries,
            mEntry: {
                userId: userId,
                name: user.name,
                water_footprint: user.total_water_footprint,
               
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