import { UserDAO } from "../data/dao/user/UserDAO";


export class LeaderboardService {

    constructor(private readonly dao: UserDAO) { }

    async getLeaderboard(userId: string): Promise<LeaderboardResponse> {

        const users = await this.dao.fetchUsers()

        const entries = users.map((user) => ({
            userId: user.id,
            name: user.name,
            water_footprint: user.total_water_footprint,
            rank: user.leaderboard_rank
        }))

        const user = await this.dao.fetchUserById(userId)


        const res = {
            entries: entries,
            myRank: {
                userId: userId,
                name: user.name,
                water_footprint: user.total_water_footprint,
                rank: user.leaderboard_rank
            }
        } as LeaderboardResponse

        return res
    }

    async calculateAndSaveLeaderboardRank() {
        const users = await this.dao.fetchUsers()
        users.sort((a, b) => a.total_water_footprint - b.total_water_footprint)

        let rank = 1;
        users.forEach(user => {
            user.leaderboard_rank = rank
            rank++
        })


        for (const user of users) {
            await this.dao.updateUserRank(user.id, user.leaderboard_rank)
        }


    }


}