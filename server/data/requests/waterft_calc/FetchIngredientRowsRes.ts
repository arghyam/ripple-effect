import { IngredientRes } from "../../../domain/models/IngredientRow";
import { IngredientGroupPatternItem } from "../../db_models/IngredientGroupPatternItem";



export interface IngredientRowRes {
    patternId: number,
    rank: number,
    patternItems: IngredientRes[]
}