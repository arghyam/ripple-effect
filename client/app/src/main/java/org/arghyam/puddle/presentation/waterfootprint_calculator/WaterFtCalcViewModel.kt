package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.content.SharedPreferences
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import org.arghyam.puddle.data.dto.requests.CalcWaterFootPrintReq
import org.arghyam.puddle.data.dto.requests.IngredientReq
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.states.FetchIngredientsState
import org.arghyam.puddle.presentation.waterfootprint_calculator.states.IngredientCalcState
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WFCOnboardEvent


const val TAG = "WaterFtCalcViewModel"

class WaterFtCalcViewModel(
    private val waterFtCalcRepo: WaterFtCalcRepository,
    private val sharedPref: SharedPreferences
) : ViewModel() {



    var selectedIngredientId = mutableIntStateOf(0)
        private set


    var selectedIngredientAmt = mutableStateOf("0")
        private set

    var isIngredientsAmtUploading = mutableStateOf(false)
        private set

    private val _fetchIngredientsState = MutableStateFlow(FetchIngredientsState())
    val fetchIngredientsState: StateFlow<FetchIngredientsState> =
        _fetchIngredientsState.asStateFlow()

    private val _ingredientStateList = MutableStateFlow<List<IngredientCalcState>>(emptyList())
    val ingredientStateList: StateFlow<List<IngredientCalcState>> =
        _ingredientStateList.asStateFlow()

    private val _eventFlow = MutableSharedFlow<WaterFtCalcUiEvent>()
    val eventFlow = _eventFlow.asSharedFlow()


    fun findAmtOfIngredient(id: Int): String? {
        val state = ingredientStateList.value.singleOrNull {it.id == id }
        return state?.amt
    }

    fun onEvent(event: WaterFtCalcEvent) {

        when (event) {

            is WaterFtCalcEvent.OnNextClicked -> {
                viewModelScope.launch {
                    sharedPref.edit()
                        .putBoolean("is_wfc_onboarding_completed", true)
                        .apply()
                    _eventFlow.emit(WaterFtCalcUiEvent.WFCOnboardCompleted)
                }
            }

            is WaterFtCalcEvent.FetchIngredients -> {

                _fetchIngredientsState.update {
                    it.copy(isLoading = true)
                }
                viewModelScope.launch {
                    waterFtCalcRepo
                        .fetchIngredients()
                        .handleResult(
                            onSuccess = { data ->

                                data?.let {
                                    _fetchIngredientsState.update {
                                        it.copy(isLoading = false, data = data)
                                    }

                                    data.forEach { row ->
                                        val listToAdded = row.items.map {
                                            //id is Ingredient Row Id or Ingredient Id
                                            IngredientCalcState(
                                                id = it.id!!,
                                                name = it.name,
                                                unit = it.unit,
                                                category = "none"
                                            )
                                        }

                                        _ingredientStateList.update { stateList ->
                                            val tempList = stateList.toMutableList()
                                            tempList.addAll(listToAdded)
                                            tempList
                                        }
                                    }
                                }

                            },
                            onError = {
                                _fetchIngredientsState.update {
                                    it.copy(isLoading = false)
                                }
                            }
                        )
                }
            }

            is WaterFtCalcEvent.SelectIngredient -> {
                selectedIngredientId.intValue = event.id

                val state = ingredientStateList.value.singleOrNull {it.id == event.id }
                selectedIngredientAmt.value = state?.amt.toString()


            }

            is WaterFtCalcEvent.ChangeAmt -> {
                selectedIngredientAmt.value = event.amt
            }

            is WaterFtCalcEvent.DoneAndUnSelectIngredient -> {


                _ingredientStateList.update { stateList ->

                    stateList.toMutableList().map { ing ->
                        if (ing.id == event.id) {
                            ing.copy(amt = selectedIngredientAmt.value.trim())
                        } else {
                            ing
                        }
                    }

                }

                selectedIngredientId.intValue = 0
                selectedIngredientAmt.value = "0"
            }

            is WaterFtCalcEvent.Complete -> {

                isIngredientsAmtUploading.value = true
                val userId = 1
                val dataToBeSend = _ingredientStateList.value
                    .filter { it.amt != "" }
                    .map {
                        IngredientReq(
                            ingredientId = it.id,
                            amount = it.amt.trim().toInt()
                        )
                    }

                viewModelScope.launch {
                    waterFtCalcRepo.calculateWaterFootprint(
                        CalcWaterFootPrintReq(
                            userId = userId,
                            data = dataToBeSend
                        )
                    ).handleResult(
                        onSuccess = { result ->
                            selectedIngredientId.intValue = 0
                            selectedIngredientAmt.value = "0"
                            isIngredientsAmtUploading.value = false
                            if (result != null) {
                                _eventFlow.emit(WaterFtCalcUiEvent.WaterFootprintCalculated(result))
                            }

                        },
                        onError = {
                            isIngredientsAmtUploading.value = false
                            _eventFlow.emit(WaterFtCalcUiEvent.WaterFootprintCalculationFailed)
                        }
                    )
                }

            }

            is WaterFtCalcEvent.OnDismissBottomSheet -> {
                selectedIngredientId.intValue = 0
                selectedIngredientAmt.value = "0"
            }

            else -> Unit
        }
    }

    override fun onCleared() {
        selectedIngredientId.intValue = 0
        selectedIngredientAmt.value = "0"
        isIngredientsAmtUploading.value = false
        super.onCleared()
    }
}