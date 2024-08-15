import { IngredientRow } from "../../db_models/IngredientRowData";
import { IngredientRowItem } from "../../db_models/IngredientRowItem";
import { WaterFtCalcResult } from "../../db_models/WaterFtCalcResult";

export interface WaterFtCalcDAO {
   
    insertIngredientRow(
        rowOrder: number
    ): Promise<IngredientRow>

    insertIngredientRowItem(
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
    ): Promise<IngredientRowItem>


    getIngredientRow(
        rowId: number,
    ): Promise<IngredientRow>

    getIngredientRows(

    ): Promise<IngredientRow[]>

    getIngredientRowItem(
        rowId: number,
    ): Promise<IngredientRowItem>

    getIngredientRowItems(
        rowId: number,
    ): Promise<IngredientRowItem[]>

    getWaterConsumptionOfIngredient(ingredientId: number): Promise<number>

    insertWaterFtCalcResult(
        userId: string,
        water_footprint: number
    ): Promise<WaterFtCalcResult>
}