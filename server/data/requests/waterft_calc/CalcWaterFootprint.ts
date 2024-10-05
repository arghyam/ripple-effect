
export interface CalcWaterFootPrintReq {

    user_id: string,
    data: RecipeReq[]

}

export interface RecipeReq {
    recipe_id: string,
    amt: number
}