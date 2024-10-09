import { injected } from "brandi"
import { UserDAO } from "../data/dao/user/UserDAO"
import { TOKENS } from "../di/tokens"

export class ProfileService {

    constructor(private readonly dao: UserDAO) { }

    async getProfileDetails(userId: string): Promise<ProfileDetailsResponse> {

        const user = await this.dao.fetchUserById(userId)

        const profileDetailsRes = {
            userId: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            photo_url: user.photo_url,
            water_footprint: user.total_water_footprint
        } as ProfileDetailsResponse
        

        return profileDetailsRes
    }


    async updateProfile(userId: string, profileDetails: UpdateProfileReq): Promise<Boolean> {

        const isUpdated = await this.dao.updateProfile(userId, profileDetails.name, profileDetails.email, profileDetails.phone_number, profileDetails.photo_url)
        

        return isUpdated
    }



}


injected(ProfileService, TOKENS.userDao)