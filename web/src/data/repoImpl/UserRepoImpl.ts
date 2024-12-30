import axios from "axios";
import { UserRepository } from "../../domain/repository/UserRepository";
import { USER_ENDPOINT } from "../../utils/Constants";
import { FetchRecipesResponse } from "../models/user/FetchRecipesResponse";
import { WftCalcResponse } from "../models/user/WftCalcResponse";
import { GetUserWftProgressResponse } from "../models/user/GetUserWftProgressResponse";
import { RecipeReq } from "../models/user/RecipeReq";
import { GetUserWftResponse } from "../models/user/GetUserWftResponse";

export class UserRepoImpl implements UserRepository {
    async fetchRecipes(searchQuery: string, page: number, pageSize: number): Promise<FetchRecipesResponse> {
      try {
        const response = await axios.get<FetchRecipesResponse>(`${USER_ENDPOINT}/get-recipes?query=${searchQuery}&page=${page}&page_size=${pageSize}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
      }
    }
  
    async calcWaterfootprint(user_id: string, data: RecipeReq[]): Promise<WftCalcResponse> {
      try {
        const response = await axios.post<WftCalcResponse>(`${USER_ENDPOINT}/calc-water-footprint`, {
          user_id,
          data
        });
        return response.data;
      } catch (error) {
        console.error('Error calc water footprint:', error);
        throw error;
      }
    }
  
    async getUserWftProgress(user_id: string): Promise<GetUserWftProgressResponse> {
      try {
        const response = await axios.get<GetUserWftProgressResponse>(`${USER_ENDPOINT}/get-user-wft-progress?userId=${user_id}`);
        return response.data;
      } catch (error) {
        console.error('Error getting user water footprint progress:', error);
        throw error;
      }
    }
  
    async getUserTotalWft(userId: string): Promise<GetUserWftResponse> {
      try {
        const response = await axios.get<GetUserWftResponse>(`${USER_ENDPOINT}/get-user-wft?userId=${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error getting user total water footprint:', error);
        throw error;
      }
    }
  }