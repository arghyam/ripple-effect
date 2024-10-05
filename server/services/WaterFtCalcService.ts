import { injected } from 'brandi'
import { WaterFtCalcDAO } from '../data/dao/waterft_calculator/WaterFtCalcDAO'
import { TOKENS } from '../di/tokens'
import { RecipeReq } from '../data/requests/waterft_calc/CalcWaterFootprint'
import { AddIngredient } from '../data/requests/waterft_calc/AddIngredient'
import { Ingredient } from '../data/db_models/Ingredient'
import { getWeekStartAndEnd, dayNames } from '../utils/DateUtils'
import { UserDAO } from '../data/dao/user/UserDAO'
import sequelize from '../db'
import { Recipe } from '../data/db_models/Recipe'
import { DayWft } from '../domain/models/DayWft'
import { logger } from '..'

export class WaterftCalcService {

  constructor(private readonly dao: WaterFtCalcDAO, private readonly userDao: UserDAO) { }

  async addIngredient(req: AddIngredient): Promise<Ingredient> {
    return this.dao.insertIngredient(req)
  }

  async getRecipes(pagesize: number, page: number, query: string): Promise<Recipe[]> {
    return this.dao.getRecipies(pagesize, page, query)
  }

  async getRecipe(id: string): Promise<Recipe> {
    return this.dao.getRecipe(id)
  }

  async calculateWaterFootprint(userId: string, recipeAmts: RecipeReq[]): Promise<number> {
    const transaction = await sequelize.transaction()

    try {
      let totalWaterConsumption = 0

      const waterConsumptions = await Promise.all(
        recipeAmts.map(async (ing_req) => {
          const water_consumption = await this.dao.getWaterConsumptionOfRecipe(ing_req.recipe_id)
          return ing_req.amt * water_consumption
        })
      )

      totalWaterConsumption = waterConsumptions.reduce((acc, curr) => acc + curr, 0)

      // Insert the water footprint calculation result
      const isWaterFtCalcResultUpdated = await this.dao.insertWaterFtCalcResult(userId, totalWaterConsumption, transaction)

      // Update the user's water footprint
      const isUserWftUpdated = await this.userDao.updateUserWft(userId, totalWaterConsumption, transaction)

      if (isUserWftUpdated && isWaterFtCalcResultUpdated) {
        await transaction.commit()
        return totalWaterConsumption
      } else {
        logger.error(`Error during water footprint calculation: before rollback if not updated ${isUserWftUpdated} && ${isWaterFtCalcResultUpdated}`)
        await transaction.rollback()
        throw new Error("Water footprint calculation halted due to server malfunction")
      }

    } catch (error) {
      throw error
    }
  }

  async getUserWftProgress(userId: string): Promise<DayWft[]> {
    const { pastWeekStart, pastWeekEnd } = getWeekStartAndEnd()
    const results = await this.dao.getWaterFtCalcResults(userId, pastWeekStart, pastWeekEnd)
    const dayWfts: DayWft[] = []

    // Create a map to easily check which dates have data
    const resultsMap = new Map<string, number>()
    results.forEach(element => {
      const dateStr = element.generated_at.toISOString().split('T')[0] // Use date string as key
      resultsMap.set(dateStr, element.water_footprint)
    })

    // Iterate over the past 7 days and populate the dayWfts array
    for (let i = 0; i < 7; i++) {
      const date = new Date(pastWeekStart)
      date.setDate(pastWeekStart.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      const dayName = dayNames[date.getDay()]
      const waterFootprint = resultsMap.get(dateStr) || 0

      dayWfts.push({
        dayName: dayName,
        water_footprint: waterFootprint
      })
    }

    return dayWfts
  }

  async getUserWft(userId: string): Promise<number> {
    const result = await this.userDao.getUserWft(userId)
    return result
  }
}

injected(WaterftCalcService, TOKENS.waterFtCalculatorDao, TOKENS.userDao)
