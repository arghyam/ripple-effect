import { injected } from 'brandi';
import { WaterFtCalcDAO } from '../data/dao/waterft_calculator/WaterFtCalcDAO';
import { TOKENS } from '../di/tokens';
import { CalcWaterFootPrintReq } from '../data/requests/waterft_calc/CalcWaterFootprint';
import { IngredientRowRes } from '../data/requests/waterft_calc/FetchIngredientRowsRes';
import { IngredientGroupPattern } from '../data/db_models/IngredientGroupPattern';
import { AddIngredientGroupPatternItem } from '../data/requests/waterft_calc/AddIngredientGroupPatternItem';
import { IngredientGroupPatternItem } from '../data/db_models/IngredientGroupPatternItem';
import { IngredientRes } from '../domain/models/IngredientRow';
import { AddIngredient } from '../data/requests/waterft_calc/AddIngredient';
import { Ingredient } from '../data/db_models/Ingredient';
import { logger } from '..';



export class WaterftCalcService {

    constructor(private readonly dao: WaterFtCalcDAO) { }

    async addIngredient(req: AddIngredient): Promise<Ingredient> {
        return this.dao.insertIngredient(req)
    }
    async AddIngredientGroupPattern(rank: number, size: number): Promise<IngredientGroupPattern> {

        const row = this.dao.insertIngredientGroupPattern(rank, size)

        return row
    }

    async addIngredientGroupPatternItem(
        req: AddIngredientGroupPatternItem
    ): Promise<IngredientGroupPatternItem> {
        return this.dao.insertIngredientGroupPatternItem(req)
    }

    async getIngredientsGroupPatternItems(this: any): Promise<IngredientRowRes[]> {
        const patterns: IngredientGroupPattern[] = await this.dao.getIngredientGroupPatterns();
        const ingredientsMap = new Map<number, Ingredient>(); // Pre-process ingredients for faster lookup
      
        for (const ingredient of await this.dao.getIngredients()) {
          ingredientsMap.set(ingredient.id, ingredient); // Build a map for efficient lookup
        }

        const results = await Promise.all(patterns.map(async (pattern: { id: number; rank: number; size: any}) => {
          
            let startItemNo = 0
        
            if (pattern.id > 1) { 
              const previousIndex = pattern.id - 1 -1
              if (previousIndex >= 0) { 
                startItemNo = patterns[previousIndex].size + 1
              } else {
                logger.info(`Pattern with ID ${pattern.id} has no previous pattern.`) // Handle edge case
              }
            }

          const patternItems = await this.dao.getIngredientGroupPatternItems(pattern.id, startItemNo, pattern.size);
          
          const processedItems: IngredientRes[] = [];
      
          for (const item of patternItems) {    
            const matchingIngredient = ingredientsMap.get(item.itemNo);
      
            if (matchingIngredient) {
              processedItems.push({
                  itemNo: item.itemNo,
                  name: matchingIngredient.name,
                  unit: matchingIngredient.unit,
                  water_footprint: matchingIngredient.water_footprint,
                  sampleImageUrl: matchingIngredient.sampleImageUrl,
                  unselectedBgImageUrl: item.unselectedBgImageUrl,
                  selectedBgImageUrl: item.selectedBgImageUrl,
                  sampleImageSize: item.sampleImageSize,
                  scaleFactor: item.scaleFactor,
                  iconScalefactor: item.iconScalefactor,
                  cornerType: item.cornerType,
                  doneXOffSet: item.doneXOffSet,
                  doneYOffSet: item.doneYOffSet,
                  pluseXOffSet: item.pluseXOffSet,
                  pluseYOffSet: item.pluseYOffSet,
                  minusXOffSet: item.minusXOffSet,
                  minusYOffSet: item.minusYOffSet,
                  xOffset: item.xOffset,
                  yOffset: item.yOffset
              });
              startItemNo = startItemNo+1
              console.log(`startItemNo: ${startItemNo}`)
            } else {
              // Handle cases where a matching ingredient is not found (optional)
              console.warn(`No matching ingredient found for itemNo: ${item.itemNo}`);
            }
          }
      
          return {
            patternId: pattern.id,
            rank: pattern.rank,
            patternItems: processedItems,
          } as IngredientRowRes;
        }));
      
        return results;
      }

    async calculateWaterFootprint(req: CalcWaterFootPrintReq): Promise<number> {

        let totalWaterConsumption = 0
        for (const ing_req of req.data) {
            const water_consumption = await this.dao.getWaterConsumptionOfIngredient(ing_req.ingredient_id)
            totalWaterConsumption = totalWaterConsumption + ing_req.amt * water_consumption

        }

        await this.dao.insertWaterFtCalcResult(req.user_id, totalWaterConsumption)

        return totalWaterConsumption
    }



}

injected(WaterftCalcService, TOKENS.waterFtCalculatorDao);