package org.arghyam.puddle.data.repoImpl

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.data.dto.requests.wft_calculator.CalcWaterFootPrintReq
import org.arghyam.puddle.data.dto.requests.wft_calculator.CalcWaterFootPrintReq2
import org.arghyam.puddle.data.dto.responses.profile.GetUserWftProgressRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.CalcWaterFtRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.FetchIngredientsRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.GetRecipeRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.GetRecipesRes
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow
import org.arghyam.puddle.domain.models.DataError
import org.arghyam.puddle.domain.models.DayWFT
import org.arghyam.puddle.domain.models.Recipe
import org.arghyam.puddle.domain.models.Result
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository

class WaterFtCalcRepoImpl(
    private val client: HttpClient
): WaterFtCalcRepository {
    override suspend fun fetchIngredients(): Result<List<IngredientRow>, DataError> {
        return try {

            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/user/fetch-ingredients")
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
                url("${BuildConfig.SERVER_URL}/api/user/calc-water-footprint")
                setBody(req)
            }.body<CalcWaterFtRes>()

            Result.Success(res.waterFootprint)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun calculateWaterFootprint2(req: CalcWaterFootPrintReq2): Result<Double, DataError> {
        return try {

            val res = client.post {
                url("${BuildConfig.SERVER_URL}/api/user/calc-water-footprint")
                setBody(req)
            }.body<CalcWaterFtRes>()

            Result.Success(res.waterFootprint)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun getRecipes(
        pageSize: Int, page: Int, query: String
    ): Result<List<Recipe>, DataError> {
        return try {
            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/user/get-recipes")
                parameter("query", query)
                parameter("page", page)
                parameter("page_size", pageSize)

            }.body<GetRecipesRes>()
            Result.Success(res.recipes)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override suspend fun getRecipe(id: String): Result<Recipe, DataError> {
        return try {
            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/user/get-recipe")
                parameter("id", id)

            }.body<GetRecipeRes>()
            Result.Success(res.recipe)
        } catch (e: Exception) {
            e.printStackTrace()
            Result.Error(DataError.Network.SERVER_ERROR)
        }
    }

    override fun getWaterFtProgress(id: String): Flow<List<DayWFT>> = flow {
        try {
            val res = client.get {
                url("${BuildConfig.SERVER_URL}/api/user/get-user-wft-progress")
                parameter("userId", id)
            }.body<GetUserWftProgressRes>()
            emit(res.queryResult)
        } catch (e: Exception) {
            e.printStackTrace()
            emit(emptyList())
        }
    }
}