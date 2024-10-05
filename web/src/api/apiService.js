import axios from "axios";


const API_URL = 'http://localhost:8080/api/user'; // Replace with your API URL


/**
 * @typedef {Object} IngredientData2
 * @property {string} id
 * @property {string} name
 * @property {string} unit
 * @property {string} quantity
 *
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} name
 * @property {string} unit
 * @property {number} water_footprint
 * @property {IngredientData2[]} ingredients
 */

/**
 * @typedef {Object} FetchRecipesResponse
 * @property {Recipe[]} recipes
 * @property {string} status_code
 * @property {string} message
 */
/**
 * Fetch recipes from the API.
 * @param {string} searchQuery
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<FetchRecipesResponse>}
 */
export const fetchRecipes = async (searchQuery, page, pageSize) => {
  try {
    const response = await axios.get(`${API_URL}/get-recipes?query=${searchQuery}&page=${page}&page_size=${pageSize}`);
    console.log(`${response.data}`)
    return /** @type {FetchRecipesResponse} */ (response.data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};


/**
 * @typedef {Object} RecipeReq
 * @property {string} recipe_id
 * @property {number} amt
 */

/**
 * @typedef {Object} WftCalcResponse
 * @property {number} water_footprint
 * @property {string} status_code
 * @property {string} message
 */

/**
 * Fetch recipes from the API.
 * @param {string} user_id
 * @param {RecipeReq[]} data
 * @returns {Promise<WftCalcResponse>}
 */
export const calcWaterfootprint = async ( user_id, data) => {
  try {
    const response = await axios.post(`${API_URL}/calc-water-footprint`, {
      user_id: user_id,
      data: data
    });
    console.log('Request Body:', response.config.data);
    console.log('Response Data:', response.data);
    return /** @type {WftCalcResponse} */ (response.data);
  } catch (error) {
    console.error('Error calc water footprint:', error);
    throw error;
  }
};

// DayWft {
//   dayName: string,
//   water_footprint: number
// }

/**
 * @typedef {Object} DayWft
 * @property {string} dayName
 * @property {number} water_footprint
 */

/**
 * @typedef {Object} GetUserWftProgressResponse
 * @property {DayWft[]} queryResult
 * @property {string} status_code
 * @property {string} message
 */


/**
 * Fetch recipes from the API.
 * @param {string} user_id
 * @returns {Promise<GetUserWftProgressResponse>}
 */

export const getUserWftProgress = async ( user_id) => {
  try {
    const response = await axios.get(`${API_URL}/get-user-wft-progress?userId=${user_id}`);
    
    console.log('Response Data:', response.data);
    return /** @type {GetUserWftProgressResponse} */ (response.data);
  } catch (error) {
    console.error('Error calc water footprint:', error);
    throw error;
  }
};


/**
 * @typedef {Object} GetUserWftResponse
 * @property {number} user_total_waterfootprint
 * @property {string} status_code
 * @property {string} message
 */


/**
 * Fetch recipes from the API.
 * @param {string} userId
 * @returns {Promise<GetUserWftResponse>}
 */
export const getUserTotalWft = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/get-user-wft?userId=${userId}`);
    
    console.log('Response Data:', response.data);
    return /** @type {GetUserWftResponse} */ (response.data);
  } catch (error) {
    console.error('Error calc water footprint:', error);
    throw error;
  }
};

