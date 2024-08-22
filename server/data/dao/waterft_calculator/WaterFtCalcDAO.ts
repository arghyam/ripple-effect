import { IngredientGroupPatternItem } from "../../db_models/IngredientGroupPatternItem";
import { Ingredient } from "../../db_models/Ingredient";
import { WaterFtCalcResult } from "../../db_models/WaterFtCalcResult";
import { AddIngredientGroupPatternItem } from "../../requests/waterft_calc/AddIngredientGroupPatternItem";
import { IngredientGroupPattern } from "../../db_models/IngredientGroupPattern";
import { AddIngredient } from "../../requests/waterft_calc/AddIngredient";

export interface WaterFtCalcDAO {
   
   
    insertIngredientGroupPattern(rank: number, size: number): Promise<IngredientGroupPattern>

    insertIngredientGroupPatternItem(
        insertReq: AddIngredientGroupPatternItem
    ): Promise<IngredientGroupPatternItem>

    insertIngredient(
        insertReq: AddIngredient
    ): Promise<Ingredient>

    getIngredientGroupPattern(patternId: number): Promise<IngredientGroupPattern>

    getIngredientGroupPatterns(
        
    ): Promise<IngredientGroupPattern[]>


    getIngredientGroupPatternItem(
        patternId: number,
        itemNo: number
    ): Promise<IngredientGroupPatternItem>

    getIngredientGroupPatternItems(
        patternId: number,
        startItemNo: number,
        lastItemNo: number,
    ): Promise<IngredientGroupPatternItem[]>


    getIngredient(ingredientId: number): Promise<Ingredient>

    getIngredients(

    ): Promise<Ingredient[]>

    getWaterConsumptionOfIngredient(ingredientId: number): Promise<number>

    insertWaterFtCalcResult(
        userId: string,
        water_footprint: number
    ): Promise<WaterFtCalcResult>
}