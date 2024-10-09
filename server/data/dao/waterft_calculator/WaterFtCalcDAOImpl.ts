
import { WaterFtCalcDAO } from './WaterFtCalcDAO';
import { Ingredient } from '../../db_models/Ingredient';
import { WaterFtCalcResult } from '../../db_models/WaterFtCalcResult';
import { v6 as uuidv6 } from "uuid";
import { AddIngredient } from '../../requests/waterft_calc/AddIngredient';
import { Op, Transaction } from 'sequelize';
import { logger } from '../../..';
import { Recipe } from '../../db_models/Recipe';
import { NotFoundError } from '../../../utils/errors/NotFoundError';


const FileName = "WaterFtCalcDAOImpl"

export class WaterFtCalcDAOImpl implements WaterFtCalcDAO {


  async getRecipies(pageSize: number, page: number, query: string): Promise<Recipe[]> {
    try {

      const offset = (page - 1) * pageSize;
      const recipes = await Recipe.findAll({
        where: { name: { [Op.iLike]: `%${query}%` } },
        limit: pageSize,
        offset: offset,
      });

      if (recipes.length === 0) {
        throw new NotFoundError(`Recipes not found`, 'RECIPE_NOT_FOUND');
      }
      return recipes

    } catch (error) {
      throw error
    }
  }

  async getRecipe(id: string): Promise<Recipe> {
    try {

      const recipe = await Recipe.findByPk(id)

      if (!recipe) {
        throw new NotFoundError(`Recipe not found`, 'RECIPE_NOT_FOUND');
      }
      return recipe

    } catch (error) {
      throw error
    }
  }

  async getWaterFtCalcResult(userId: string, date: Date): Promise<WaterFtCalcResult> {
    try {

      date.setHours(0, 0, 0)
      logger.info(`date obj is: ${date}`)
      const result = await WaterFtCalcResult.findOne({
        where: {
          user_id: userId,
          generated_at: {
            [Op.gte]: date,
            [Op.lte]: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          }
        }
      })

      if (result == null) {
        throw new NotFoundError(`WaterFtCalcResult Record not found with date: ${date}`, 'RECORD_NOT_FOUND')
      }

      return result

    } catch (error) {
      throw error
    }
  }

  async getWaterFtCalcResults(userId: string, startDate: Date, endDate: Date): Promise<WaterFtCalcResult[]> {
    try {

      const result = await WaterFtCalcResult.findAll({
        where: {
          user_id: userId,
          generated_at: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      })

      return result

    } catch (error) {
      throw error
    }

  }


  async getIngredient(ingredientId: number): Promise<Ingredient> {
    try {

      const ingredient = await Ingredient.findOne({ where: { id: ingredientId } })
      if (!ingredient) {
        throw new NotFoundError(`Ingredient with id: ${ingredientId} not found`, 'INGREDIENT_NOT_FOUND')
      }
      return ingredient
    } catch (error) {
      throw error
    }
  }

  async getIngredientByName(name: string): Promise<Ingredient> {
    try {

      const ingredient = await Ingredient.findOne({ where: { name: name } })
      if (!ingredient) {
        throw new NotFoundError(`Ingredient with name: ${name} not found`, 'INGREDIENT_NOT_FOUND')
      }
      return ingredient
    } catch (error) {
      throw error
    }
  }


  async getIngredients(): Promise<Ingredient[]> {
    try {

      const ingredients = await Ingredient.findAll()
      if (!ingredients) {
        throw new NotFoundError('No ingredients found', 'INGREDIENTS_NOT_FOUND')
      }
      return ingredients
    } catch (error) {
      throw error
    }
  }


  async insertIngredient(insertReq: AddIngredient): Promise<Ingredient> {
    try {

      const insertedIngredient = await Ingredient.create({
        name: insertReq.name,
        unit: insertReq.unit,
        water_footprint: insertReq.water_footprint,
        last_updated: new Date()
      })
      return insertedIngredient
    } catch (error) {
      throw error
    }
  }

  async insertWaterFtCalcResult(userId: string, water_footprint: number, transaction: Transaction): Promise<Boolean> {
    try {

      const today = new Date()
      const existingRecord = await WaterFtCalcResult.findOne(
        {
          where: {
            user_id: userId,
            generated_at: {
              [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
              [Op.lte]: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            }

          },
          transaction
        }
      )

      if (!existingRecord) {

        const id = uuidv6()
        const now = new Date()
        const result = await WaterFtCalcResult.create({
          id: id,
          user_id: userId,
          water_footprint: water_footprint,
          generated_at: now

        })

        return result != null
      } else {
      

        const now = new Date()
        const [updatedCount] = await WaterFtCalcResult.update({
          water_footprint: water_footprint,
          generated_at: now
        },
          {
            where: {
              user_id: userId,
              id: existingRecord.id
            }
          }
        )

        return updatedCount == 1
      }



    } catch (error) {
      throw error
    }
  }




  async getWaterConsumptionOfRecipe(recipeId: string): Promise<number> {
    try {

      const recipe = await Recipe.findByPk(recipeId);

      if (!recipe) {
        throw new NotFoundError("Recipe is not available", 'RECIPE_NOT_FOUND');
      }

      return recipe.water_footprint

    } catch (error) {
      throw error
    }
  }


}