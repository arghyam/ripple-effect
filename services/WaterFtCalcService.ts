import { injected } from 'brandi';
import { WaterFtCalcDAO } from '../data/dao/waterft_calculator/WaterFtCalcDAO';
import { TOKENS } from '../di/tokens';
import { CalcWaterFootPrintReq } from '../data/requests/waterft_calc/CalcWaterFootprint';
import { IngredientRow } from '../data/db_models/IngredientRowData';
import { IngredientRowItem } from '../data/db_models/IngredientRowItem';
import { InsertIngredientRowItem } from '../data/requests/waterft_calc/InsertIngredientRowItem';
import { IngredientRowRes } from '../data/requests/waterft_calc/FetchIngredientRowsRes';



export class WaterftCalcService {

    constructor(private readonly dao: WaterFtCalcDAO) { }


    async addIngredientRow(rowOrder: number): Promise<IngredientRow> {

        const row = this.dao.insertIngredientRow(rowOrder)

        return row
    }

    async addIngredientRowItem(
        req: InsertIngredientRowItem
    ): Promise<IngredientRowItem> {
        const rowItem = this.dao.insertIngredientRowItem(
            req.itemId,
            req.rowId, 
            req.name, 
            req.amt,
            req.unit,
            req.waterFootprint,
            req.unselectedBgImageUrl,
            req.selectedBgImageUrl,
            req.sampleImageUrl,
            req.sampleImageSize,
            req.scaleFactor,
            req.iconScalefactor,
            req.cornerType,
            req.doneXOffSet,
            req.doneYOffSet,
            req.pluseXOffSet,
            req.pluseYOffSet,
            req.minusXOffSet,
            req.minusYOffSet,
            req.xOffset, 
            req.yOffset
        )
        return rowItem
    }


    async getIngredientsRows(): Promise<IngredientRowRes[]> {

        const rows  = await this.dao.getIngredientRows()
        
        return await Promise.all(rows.map(async (element) => {
            const rowItems = await this.dao.getIngredientRowItems(element.id);

            return {
                rowId: element.id,
                rowOrder: element.rowOrder,
                rowItems: rowItems
            } as IngredientRowRes
        }))

        
    }

    async calculateWaterFootprint(req: CalcWaterFootPrintReq): Promise<number> {

        let totalWaterConsumption = 0
        for (const ing_req of req.data) {
            const water_consumption = await this.dao.getWaterConsumptionOfIngredient(ing_req.ingredient_id)
            totalWaterConsumption = totalWaterConsumption + ing_req.amt * water_consumption
        
        }

        return totalWaterConsumption
    }

}

injected(WaterftCalcService, TOKENS.waterFtCalculatorDao);