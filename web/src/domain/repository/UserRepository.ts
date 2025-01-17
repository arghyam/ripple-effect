import { FetchRecipesResponse } from "../../data/models/user/FetchRecipesResponse";
import { GetUserWftProgressResponse } from "../../data/models/user/GetUserWftProgressResponse";
import { GetUserWftResponse } from "../../data/models/user/GetUserWftResponse";
import { RecipeReq } from "../../data/models/user/RecipeReq";
import { WftCalcResponse } from "../../data/models/user/WftCalcResponse";

export interface UserRepository {
  fetchRecipes(searchQuery: string, page: number, pageSize: number): Promise<FetchRecipesResponse>;
  calcWaterfootprint(user_id: string, data: RecipeReq[]): Promise<WftCalcResponse>;
  getUserWftProgress(user_id: string): Promise<GetUserWftProgressResponse>;
  getUserTotalWft(userId: string): Promise<GetUserWftResponse>;
}




