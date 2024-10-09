import { Ingredient } from "../../db_models/Ingredient";
import { WaterFtCalcResult } from "../../db_models/WaterFtCalcResult";
import { AddIngredient } from "../../requests/waterft_calc/AddIngredient";
import { Recipe } from "../../db_models/Recipe";
import { Transaction } from "sequelize";

export interface WaterFtCalcDAO {
   

    insertIngredient(
        insertReq: AddIngredient
    ): Promise<Ingredient>

    getIngredientByName(
        name: string
    ): Promise<Ingredient>

    getIngredients(

    ): Promise<Ingredient[]>


    getRecipe(recipeId: string): Promise<Recipe>

    getRecipies(
        pagesize: number,
        page: number,
        query: string
    ): Promise<Recipe[]>

    getWaterConsumptionOfRecipe(recipeId: string): Promise<number>

    insertWaterFtCalcResult(
        userId: string,
        water_footprint: number,
        transaction: Transaction
    ): Promise<Boolean>

    getWaterFtCalcResult(
        userId: string,
        date: Date
    ): Promise<WaterFtCalcResult>

    getWaterFtCalcResults(
        userId: string,
        startDate: Date,
        endDate: Date
    ): Promise<WaterFtCalcResult[]>
}