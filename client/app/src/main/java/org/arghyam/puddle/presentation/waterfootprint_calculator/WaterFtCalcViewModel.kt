package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.content.SharedPreferences
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.arghyam.puddle.data.dto.requests.wft_calculator.CalcWaterFootPrintReq2
import org.arghyam.puddle.data.dto.requests.wft_calculator.RecipeReq
import org.arghyam.puddle.data.paging.WFCPagingSource
import org.arghyam.puddle.domain.models.Recipe
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent


const val TAG = "WaterFtCalcViewModel"

data class RecipeWithQuantity(
    val recipeId: String,
    val quantity: Int,
    val unit: String
)
class WaterFtCalcViewModel(
    private val waterFtCalcRepo: WaterFtCalcRepository,
    private val sharedPref: SharedPreferences,
) : ViewModel() {

    private val _recipesWithQuantityState = MutableStateFlow<List<RecipeWithQuantity>>(listOf())
    val recipesWithQuantityState: StateFlow<List<RecipeWithQuantity>> = _recipesWithQuantityState.asStateFlow()

    var currentRecipe by mutableStateOf<Recipe?>(null)
        private set

    private val _query = MutableStateFlow("")
    val query: StateFlow<String> get() = _query

    private val _eventFlow = MutableSharedFlow<WaterFtCalcUiEvent>()
    val eventFlow = _eventFlow.asSharedFlow()



    @OptIn(FlowPreview::class, ExperimentalCoroutinesApi::class)
    val mRecipes = _query
        .debounce(300) // Add debounce to handle rapid query changes
        .flatMapLatest { query ->
            Pager(
                config = PagingConfig(
                    pageSize = 20,
                    enablePlaceholders = false
                ),
                pagingSourceFactory = { WFCPagingSource(waterFtCalcRepo, query) }
            ).flow.cachedIn(viewModelScope)
        }.stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000), // Adjust the timeout as needed
            initialValue = PagingData.empty()
        )

    fun onEvent(event: WaterFtCalcEvent) {

        when (event) {


            is WaterFtCalcEvent.OnSearchQuery -> {
                _query.update {
                    event.query
                }
            }

            is WaterFtCalcEvent.FetchRecipe -> {

                viewModelScope.launch {
                    waterFtCalcRepo.getRecipe(id = event.recipeId)
                        .handleResult(
                            onSuccess = { recipe ->
                                recipe?.let {
                                    currentRecipe = it
                                }

                            }
                        )
                }


            }

            is WaterFtCalcEvent.ChangeAmt -> {
                _recipesWithQuantityState.update { oldList ->
                    val recipeIndex = oldList.indexOfFirst { it.recipeId == event.recipeId }
                    if (recipeIndex != -1) {
                        val recipe = oldList[recipeIndex]
                        return@update oldList.toMutableList().apply {
                            set(recipeIndex, recipe.copy(quantity = event.amt))
                        }
                    } else {
                        return@update oldList.toMutableList().apply {
                            add(RecipeWithQuantity(event.recipeId, event.amt, "kg"))
                        }
                    }
                }
            }
            is WaterFtCalcEvent.DecrementAmt -> {
                _recipesWithQuantityState.update { oldList ->
                    val recipeIndex = oldList.indexOfFirst { it.recipeId == event.recipeId }
                    if (recipeIndex != -1) {
                        val recipe = oldList[recipeIndex]
                        return@update oldList.toMutableList().apply {
                            set(recipeIndex, recipe.copy(quantity = maxOf(recipe.quantity - 1, 0)))
                        }
                    } else {
                        oldList
                    }
                }
            }
            is WaterFtCalcEvent.IncrementAmt -> {
                _recipesWithQuantityState.update { oldList ->
                    val recipeIndex = oldList.indexOfFirst { it.recipeId == event.recipeId }
                    if (recipeIndex != -1) {
                        val recipe = oldList[recipeIndex]
                        return@update oldList.toMutableList().apply {
                            set(recipeIndex, recipe.copy(quantity = recipe.quantity + 1))
                        }
                    } else {
                        return@update oldList.toMutableList().apply {
                            add(RecipeWithQuantity(event.recipeId, 1, "kg"))
                        }
                    }
                }
            }

            WaterFtCalcEvent.CalcWaterFootprint -> {

                viewModelScope.launch {
                    val data = recipesWithQuantityState.value.map {
                        RecipeReq(it.recipeId, amount = it.quantity)
                    }
                    waterFtCalcRepo.calculateWaterFootprint2(
                        req = CalcWaterFootPrintReq2(
                            userId = "1ef5b01f-008f-6af0-aae7-781b2b58beb0",
                            data = data
                        )
                    ).handleResult(
                        onSuccess = { wft ->

                            wft?.let {
                                _eventFlow.emit(WaterFtCalcUiEvent.WaterFootprintCalculated(wft))
                            }

                        },
                        onError = {
                            _eventFlow.emit(WaterFtCalcUiEvent.WaterFootprintCalculationFailed)
                        }
                    )
                }
            }
        }
    }

}