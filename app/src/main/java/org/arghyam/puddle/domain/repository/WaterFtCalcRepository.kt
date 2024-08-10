package org.arghyam.puddle.domain.repository

import org.arghyam.puddle.data.dto.requests.CalcWaterFootPrintReq
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Result

interface WaterFtCalcRepository {

    suspend fun fetchIngredients(

    ): Result<List<IngredientRow>, DataError>

    suspend fun calculateWaterFootprint(
        req: CalcWaterFootPrintReq
    ): Result<Double, DataError>
}