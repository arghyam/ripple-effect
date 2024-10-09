package org.arghyam.puddle.domain.repository

import kotlinx.coroutines.flow.Flow
import org.arghyam.puddle.data.dto.requests.wft_calculator.CalcWaterFootPrintReq
import org.arghyam.puddle.data.dto.requests.wft_calculator.CalcWaterFootPrintReq2
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.DayWFT
import org.arghyam.puddle.domain.models.Recipe
import org.arghyam.puddle.domain.models.Result

interface WaterFtCalcRepository {

    suspend fun fetchIngredients(

    ): Result<List<IngredientRow>, DataError>

    suspend fun calculateWaterFootprint(
        req: CalcWaterFootPrintReq
    ): Result<Double, DataError>

    suspend fun calculateWaterFootprint2(
        req: CalcWaterFootPrintReq2
    ): Result<Double, DataError>


    suspend fun getRecipes(
        pageSize: Int,
        page: Int,
        query: String
    ): Result<List<Recipe>, DataError>

    suspend fun getRecipe(
        id: String
    ): Result<Recipe, DataError>


    fun getWaterFtProgress(
        id: String
    ): Flow<List<DayWFT>>
}