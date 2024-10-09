import { IngredientRes } from "../../../domain/models/IngredientRow";



export interface IngredientRowRes {
    patternId: number,
    rank: number,
    patternItems: IngredientRes[]
}