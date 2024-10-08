import axios from "axios";

const API_URL = 'http://localhost:8080/api/user'; // Replace with your API URL

interface IngredientData2 {
  id: string;
  name: string;
  unit: string;
  quantity: string;
}

interface Recipe {
  id: string;
  name: string;
  unit: string;
  water_footprint: number;
  ingredients: IngredientData2[];
  thumbnail_url: string;
}

interface FetchRecipesResponse {
  recipes: Recipe[];
  status_code: string;
  message: string;
}

/**
 * Fetch recipes from the API.
 * @param {string} searchQuery
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<FetchRecipesResponse>}
 */
export const fetchRecipes = async (searchQuery: string, page: number, pageSize: number): Promise<FetchRecipesResponse> => {
  try {
    const response = await axios.get<FetchRecipesResponse>(`${API_URL}/get-recipes?query=${searchQuery}&page=${page}&page_size=${pageSize}`);
    console.log(`${response.data}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

interface RecipeReq {
  recipe_id: string;
  amt: number;
}

interface WftCalcResponse {
  water_footprint: number;
  status_code: string;
  message: string;
}

/**
 * Calculate water footprint.
 * @param {string} user_id
 * @param {RecipeReq[]} data
 * @returns {Promise<WftCalcResponse>}
 */
export const calcWaterfootprint = async (user_id: string, data: RecipeReq[]): Promise<WftCalcResponse> => {
  try {
    const response = await axios.post<WftCalcResponse>(`${API_URL}/calc-water-footprint`, {
      user_id: user_id,
      data: data
    });
    console.log('Request Body:', response.config.data);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calc water footprint:', error);
    throw error;
  }
};

interface DayWft {
  dayName: string;
  water_footprint: number;
}

interface GetUserWftProgressResponse {
  queryResult: DayWft[];
  status_code: string;
  message: string;
}

/**
 * Get user water footprint progress.
 * @param {string} user_id
 * @returns {Promise<GetUserWftProgressResponse>}
 */
export const getUserWftProgress = async (user_id: string): Promise<GetUserWftProgressResponse> => {
  try {
    const response = await axios.get<GetUserWftProgressResponse>(`${API_URL}/get-user-wft-progress?userId=${user_id}`);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting user water footprint progress:', error);
    throw error;
  }
};

interface GetUserWftResponse {
  user_total_waterfootprint: number;
  status_code: string;
  message: string;
}

/**
 * Get user total water footprint.
 * @param {string} userId
 * @returns {Promise<GetUserWftResponse>}
 */
export const getUserTotalWft = async (userId: string): Promise<GetUserWftResponse> => {
  try {
    const response = await axios.get<GetUserWftResponse>(`${API_URL}/get-user-wft?userId=${userId}`);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting user total water footprint:', error);
    throw error;
  }
};
