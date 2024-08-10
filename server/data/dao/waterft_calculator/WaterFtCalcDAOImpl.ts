
import { GetIngredientRowDAOError, GetIngredientRowItemDAOError, GetIngredientRowItemsDAOError, GetIngredientRowsDAOError, GetWaterConsumptionOfIngredientDAOError, IngredientNotFoundError, InsertIngredientRowDAOError, InsertIngredientRowItemDAOError, UnknownDatabaseError } from '../../../routes/water_ft_catculator/errorhandling/ErrorCodes';
import { WaterFtCalcError } from '../../../routes/water_ft_catculator/errorhandling/ErrorUtils';
import { WaterFtCalcDAO } from './WaterFtCalcDAO';
import { IngredientRow } from '../../db_models/IngredientRowData';
import { IngredientRowItem } from '../../db_models/IngredientRowItem';
import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';
import { DatabaseError } from "../../../utils/errors/ErrorUtils";


const FileName = "WaterFtCalcDAOImpl"

export class WaterFtCalcDAOImpl implements WaterFtCalcDAO {

  async getIngredientRow(rowId: number): Promise<IngredientRow> {
    try {
      const row = await IngredientRow.findOne({ where: { id: rowId } })
      if (row == null) {
        throw new WaterFtCalcError("Row not found", GetIngredientRowDAOError)
      }
      return row
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRow`, UnknownDatabaseError);
      }
    }
  }
  async getIngredientRows(): Promise<IngredientRow[]> {
    try {
      const rows = await IngredientRow.findAll()
      if (rows == null) {
        throw new WaterFtCalcError("Rows not found", GetIngredientRowsDAOError)
      }
      return rows
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, GetIngredientRowsDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRows`, UnknownDatabaseError);
      }
    }
  }
  async getIngredientRowItem(rowId: number): Promise<IngredientRowItem> {
    try {

      const row = await IngredientRowItem.findOne({ where: { id: rowId } })
      if (row == null) {
        throw new WaterFtCalcError("Row item not found", GetIngredientRowItemDAOError)
      }
      return row
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItem`, UnknownDatabaseError);
      }
    }
  }
  async getIngredientRowItems(rowId: number): Promise<IngredientRowItem[]> {
    try {

      const rows = await IngredientRowItem.findAll({ where: { rowId: rowId } })
      if (rows == null) {
        throw new WaterFtCalcError("Row items not found", GetIngredientRowItemsDAOError)
      }
      return rows
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, GetIngredientRowItemsDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- getIngredientRowItems`, UnknownDatabaseError);
      }
    }
  }
  async insertIngredientRow(rowOrder: number): Promise<IngredientRow> {
    try {
      const row = await IngredientRow.create({ rowOrder: rowOrder })
      return row
    } catch (error) {
      if (error instanceof Error) {

        throw new DatabaseError(error.message, InsertIngredientRowDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertIngredientRow`, UnknownDatabaseError);
      }
    }
  }
  async insertIngredientRowItem(
    itemId: number,
    rowId: number,
    name: string,
    amt: number,
    unit: string,
    waterFootprint: number,
    unselectedBgImageUrl: string,
    selectedBgImageUrl: string,
    sampleImageUrl: string,
    sampleImageSize: number,
    scaleFactor: number,
    iconScalefactor: number,
    cornerType: string,
    doneXOffSet: number,
    doneYOffSet: number,
    pluseXOffSet: number,
    pluseYOffSet: number,
    minusXOffSet: number,
    minusYOffSet: number,
    xOffset: number,
    yOffset: number
  ): Promise<IngredientRowItem> {
    try {
      const rowItem = await IngredientRowItem.create(
        {
          itemId: itemId,
          rowId: rowId,
          name: name,
          amt: amt,
          unit: unit,
          water_footprint: waterFootprint,
          unselectedBgImageUrl: unselectedBgImageUrl,
          selectedBgImageUrl: selectedBgImageUrl,
          sampleImageUrl: sampleImageUrl,
          sampleImageSize: sampleImageSize,
          scaleFactor: scaleFactor,
          iconScalefactor: iconScalefactor,
          cornerType: cornerType,
          doneXOffSet: doneXOffSet,
          doneYOffSet: doneYOffSet,
          pluseXOffSet: pluseXOffSet,
          pluseYOffSet: pluseYOffSet,
          minusXOffSet: minusXOffSet,
          minusYOffSet: minusYOffSet,
          xOffset: xOffset,
          yOffset: yOffset
        }
      )
      return rowItem
    } catch (error) {

     
      if (error instanceof Error) {
        throw new DatabaseError(error.message, InsertIngredientRowItemDAOError);
      } else {
        throw new DatabaseError(`e is not a instance of Error: ${FileName} --- insertIngredientRowItem`, UnknownDatabaseError);
      }
    }
  }
  async getWaterConsumptionOfIngredient(ingredientId: number): Promise<number> {
    try {

      const ingredient = await IngredientRowItem.findByPk(ingredientId);

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