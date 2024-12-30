import { IngredientData2 } from './IngredientData2';

export interface Recipe {
  id: string;
  name: string;
  unit: string;
  water_footprint: number;
  ingredients: IngredientData2[];
  thumbnail_url: string;
}
