
export interface CalcWaterFootPrintReq {

    user_id: string,
    data: IngredientReq[]

}

interface IngredientReq {
    ingredient_id: number,
    amt: number
}