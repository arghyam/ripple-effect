package org.arghyam.puddle.data.repoImpl

import org.arghyam.puddle.data.dto.requests.CalcWaterFootPrintReq
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.CalcWaterFtRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.FetchIngredientsRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.utils.SERVER_URL
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class WaterFtCalcRepoImpl(
    private val client: HttpClient
): WaterFtCalcRepository {
    override suspend fun fetchIngredients(): Result<List<IngredientRow>, DataError> {
        return try {

            val res = client.get {
                url("$SERVER_URL/api/user/fetch-ingredients")
            }.body<FetchIngredientsRes>()

            Result.Success(res.data)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun calculateWaterFootprint(req: CalcWaterFootPrintReq): Result<Double, DataError> {
        return try {

            val res = client.post {
                url("$SERVER_URL/api/user/calc-water-footprint")
                setBody(req)
            }.body<CalcWaterFtRes>()

            Result.Success(res.waterFootprint)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }
}