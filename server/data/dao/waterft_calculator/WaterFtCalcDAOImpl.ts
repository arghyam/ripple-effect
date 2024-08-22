
import { GetIngredientRowDAOError, GetIngredientRowItemDAOError, GetIngredientRowItemsDAOError, GetIngredientRowsDAOError, GetWaterConsumptionOfIngredientDAOError, IngredientNotFoundError, InsertIngredientRowDAOError, InsertIngredientRowItemDAOError, InsertWaterFtCalcResultDAOError, UnknownDatabaseError } from '../../../utils/errors/ErrorCodes';
import { DatabaseError, WaterFtCalcError } from '../../../utils/errors/ErrorUtils';
import { WaterFtCalcDAO } from './WaterFtCalcDAO';
import { IngredientGroupPatternItem } from '../../db_models/IngredientGroupPatternItem';
import { Ingredient } from '../../db_models/Ingredient';
import { WaterFtCalcResult } from '../../db_models/WaterFtCalcResult';
import { v6 as uuidv6 } from "uuid";
import { AddIngredientGroupPatternItem } from '../../requests/waterft_calc/AddIngredientGroupPatternItem';
import { IngredientGroupPattern } from '../../db_models/IngredientGroupPattern';
import { AddIngredient } from '../../requests/waterft_calc/AddIngredient';
import { Op } from 'sequelize';


const FileName = "WaterFtCalcDAOImpl"

export class WaterFtCalcDAOImpl implements WaterFtCalcDAO {


  async getIngredient(ingredientId: number): Promise<Ingredient> {
    try {

      const ingredient = await Ingredient.findOne({ where: { id: ingredientId} })
      if (ingredient == null) {
        throw new WaterFtCalcError("Row item not found", GetIngredientRowItemDAOError)
      }
      return ingredient
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItem`, UnknownDatabaseError);
      }
    }
  }
  async getIngredients(): Promise<Ingredient[]> {
    try {

      const ingredients = await Ingredient.findAll()
      if (ingredients == null) {
        throw new WaterFtCalcError("Row items not found", GetIngredientRowItemsDAOError)
      }
      return ingredients
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, GetIngredientRowItemsDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItems`, UnknownDatabaseError);
      }
    }
  }
  

  async insertIngredientGroupPattern(rank: number, size: number): Promise<IngredientGroupPattern> {
    try {
      const insertedPattern = await IngredientGroupPattern.create({ rank: rank, size: size })
      return insertedPattern
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertIngredientRow`, UnknownDatabaseError);
      }
    }
  }
  async insertIngredientGroupPatternItem(
    insertReq: AddIngredientGroupPatternItem
): Promise<IngredientGroupPatternItem> {
    try {

      const insertedItem = await IngredientGroupPatternItem.create(
        {
          itemNo: insertReq.itemNo,
          patternId: insertReq.patternId,
          unselectedBgImageUrl: insertReq.unselectedBgImageUrl,
          selectedBgImageUrl: insertReq.selectedBgImageUrl,
          sampleImageSize: insertReq.sampleImageSize,
          scaleFactor: insertReq.scaleFactor,
          iconScalefactor: insertReq.iconScalefactor,
          cornerType: insertReq.cornerType,
          doneXOffSet: insertReq.doneXOffSet,
          doneYOffSet: insertReq.doneYOffSet,
          pluseXOffSet: insertReq.pluseXOffSet,
          pluseYOffSet: insertReq.pluseYOffSet,
          minusXOffSet: insertReq.minusXOffSet,
          minusYOffSet: insertReq.minusYOffSet,
          xOffset: insertReq.xOffset,
          yOffset: insertReq.yOffset
        }
      )
      return insertedItem
    } catch (error) {


      if (error instanceof Error) {
        throw new DatabaseError(error.message, InsertIngredientRowItemDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertIngredientRowItem`, UnknownDatabaseError);
      }
    }
  }

  async insertIngredient(insertReq: AddIngredient): Promise<Ingredient> {
    try {
      console.log(`inserted ingre daoimpl: ${insertReq.name} ${insertReq.unit} ${insertReq.water_footprint} ${insertReq.sampleImageUrl}`)
      const insertedIngredient = await Ingredient.create({ 
        name: insertReq.name,
        unit: insertReq.unit,
        water_footprint: insertReq.water_footprint,
        sampleImageUrl: insertReq.sampleImageUrl
       })
      return insertedIngredient
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertIngredientRow`, UnknownDatabaseError);
      }
    }
  }

  async insertWaterFtCalcResult(userId: string, water_footprint: number): Promise<WaterFtCalcResult> {
    try {

      const id = uuidv6()
      const result = await WaterFtCalcResult.create({
        id: id,
        user_id: userId,
        water_footprint: water_footprint
      })
      
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, InsertWaterFtCalcResultDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertWaterFtCalcResult`, UnknownDatabaseError);
      }
    }
  }

  async getIngredientGroupPattern(patternId: number): Promise<IngredientGroupPattern> {
    try {
      const pattern = await IngredientGroupPattern.findOne({ where: { id: patternId } })
      if (pattern == null) {
        throw new WaterFtCalcError("Pattern not found", GetIngredientRowDAOError)
      }
      return pattern
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRow`, UnknownDatabaseError);
      }
    }
  }
  async getIngredientGroupPatterns(): Promise<IngredientGroupPattern[]> {
    try {
      const patterns = await IngredientGroupPattern.findAll()
      if (patterns == null) {
        throw new WaterFtCalcError("Rows not found", GetIngredientRowsDAOError)
      }
      return patterns
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, GetIngredientRowsDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRows`, UnknownDatabaseError);
      }
    }
  }

  async getIngredientGroupPatternItem(patternId: number, itemNo: number): Promise<IngredientGroupPatternItem> {
    try {

      const item = await IngredientGroupPatternItem.findOne({ where: { id: patternId, itemNo: itemNo } })
      if (item == null) {
        throw new WaterFtCalcError("Row item not found", GetIngredientRowItemDAOError)
      }
      return item
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItem`, UnknownDatabaseError);
      }
    }
  }
  async getIngredientGroupPatternItems(patternId: number, startItemNo: number, size: number): Promise<IngredientGroupPatternItem[]> {
    try {

      const items = await IngredientGroupPatternItem.findAll({
        where: {
          itemNo: {
            [Op.lte]: startItemNo + size,
            [Op.gte]: startItemNo
          }
        }
      })
      
      if (items == null) {
        throw new WaterFtCalcError("Row items not found", GetIngredientRowItemsDAOError)
      }
      return items
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, GetIngredientRowItemsDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItems`, UnknownDatabaseError);
      }
    }
  }
  


  async getWaterConsumptionOfIngredient(ingredientId: number): Promise<number> {
    try {

      const ingredient = await Ingredient.findByPk(ingredientId);

      if (ingredient == null) {
        throw new WaterFtCalcError("ingredient is not available", IngredientNotFoundError)
      }

      return ingredient.water_footprint

    } catch (error) {
      if (error instanceof WaterFtCalcError) {
        throw error
      } else if (error instanceof Error) {

        throw new DatabaseError(error.message, GetWaterConsumptionOfIngredientDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getWaterConsumptionOfIngredient`, UnknownDatabaseError);
      }
    }
  }


}