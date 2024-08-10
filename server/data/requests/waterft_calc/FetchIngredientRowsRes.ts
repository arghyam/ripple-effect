import { IngredientRowItem } from "../../db_models/IngredientRowItem";


export interface IngredientRowRes {
    rowId: number,
    rowOrder: number,
    rowItems: IngredientRowItem[]
}