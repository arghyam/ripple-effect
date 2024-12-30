import { Recipe } from './Recipe';

export interface FetchRecipesResponse {
  recipes: Recipe[];
  status_code: string;
  message: string;
}
