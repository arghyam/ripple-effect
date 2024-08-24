package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Done
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.states.IngredientCalcState
import org.arghyam.puddle.ui.theme.puddleFontFamily
import kotlinx.coroutines.flow.collectLatest
import org.koin.androidx.compose.koinViewModel


@OptIn(ExperimentalMaterial3Api::class)
@Preview
@Composable
fun WaterFootprintCalculator(
    waterFtCalcViewModel: WaterFtCalcViewModel = koinViewModel()
) {


    val ingredientStateList = waterFtCalcViewModel.ingredientStateList.collectAsState()

    val selectedIngredient =
        ingredientStateList.value.singleOrNull { it.id == waterFtCalcViewModel.selectedIngredientId.intValue }

    var isBottomSheetOpened by remember {
        mutableStateOf(false)
    }

    val context = LocalContext.current

    LaunchedEffect(key1 = true) {
        waterFtCalcViewModel.eventFlow.collectLatest { event ->

            when(event) {
                is WaterFtCalcUiEvent.WaterFootprintCalculated -> {
                    Toast.makeText(context, "Water Footprint Calculated", Toast.LENGTH_SHORT).show()
                }
                is WaterFtCalcUiEvent.WaterFootprintCalculationFailed -> {
                    Toast.makeText(context, "Water Footprint Calculation Failed", Toast.LENGTH_SHORT).show()
                }
                else -> Unit
            }
        }
    }


    if (isBottomSheetOpened) {
        ModalBottomSheet(
            dragHandle = {

                Column(verticalArrangement = Arrangement.Center) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        IconButton(
                            modifier = Modifier.size(50.dp),
                            onClick = {
                                isBottomSheetOpened = false
                                waterFtCalcViewModel.onEvent(WaterFtCalcEvent.OnDismissBottomSheet)
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "close_icon"
                            )
                        }
                        IconButton(
                            modifier = Modifier.size(50.dp),
                            onClick = {
                                if (selectedIngredient != null) {
                                    waterFtCalcViewModel.onEvent(
                                        WaterFtCalcEvent.DoneAndUnSelectIngredient(
                                            selectedIngredient.id
                                        )
                                    )
                                }
                                isBottomSheetOpened = false
                            }
                        ) {
                            Icon(imageVector = Icons.Default.Done, contentDescription = "done_icon")
                        }
                    }

                    HorizontalDivider()
                }

            },
            onDismissRequest = { isBottomSheetOpened = false }
        ) {

            Text(
                modifier = Modifier.padding(top = 10.dp, start = 20.dp, end = 20.dp),
                text = "Enter Amount",
                style = TextStyle(
                    fontSize = 18.sp
                )
            )


            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 20.dp, bottom = 20.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {

                IconButton(
                    modifier = Modifier.size(50.dp),
                    onClick = { if (selectedIngredient != null) {
                        waterFtCalcViewModel.onEvent(
                            WaterFtCalcEvent.ChangeAmt(
                                selectedIngredient.id,
                                "${waterFtCalcViewModel.selectedIngredientAmt.value.toInt() - 1}"
                            )
                        )
                    } }
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_remove_24),
                        contentDescription = "remove"
                    )
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    TextField(
                        value = waterFtCalcViewModel.selectedIngredientAmt.value,
                        onValueChange = {
                            if (selectedIngredient != null) {
                                waterFtCalcViewModel.onEvent(
                                    WaterFtCalcEvent.ChangeAmt(
                                        selectedIngredient.id,
                                        it
                                    )
                                )
                            }
                        },
                        textStyle = TextStyle(
                            fontSize = 20.sp,
                            textAlign = TextAlign.Center
                        ),
                        singleLine = true,
                        modifier = Modifier
                            .fillMaxWidth(0.50f)
                            .height(60.dp)
                            .clip(RoundedCornerShape(15.dp)),
                        keyboardOptions = KeyboardOptions(
                            imeAction = ImeAction.Done,
                            keyboardType = KeyboardType.Number
                        ),
                        colors = TextFieldDefaults.colors(
                            focusedIndicatorColor = Color.Transparent,
                            unfocusedIndicatorColor = Color.Transparent,
                            unfocusedContainerColor = MaterialTheme.colorScheme.tertiary,
                            focusedContainerColor = MaterialTheme.colorScheme.tertiary,
                            focusedTextColor = MaterialTheme.colorScheme.onPrimary,
                            unfocusedTextColor = MaterialTheme.colorScheme.onPrimary,
                            cursorColor = MaterialTheme.colorScheme.onPrimary
                        )

                    )

                    if (selectedIngredient != null) {
                        Text(
                            text = "in ${selectedIngredient.unit}",
                            style = TextStyle(
                                fontSize = 20.sp,
                                fontFamily = puddleFontFamily,
                                fontWeight = FontWeight.W200,
                            )
                        )
                    }

                }


                IconButton(
                    modifier = Modifier.size(50.dp),
                    onClick = {
                        if (selectedIngredient != null) {
                            waterFtCalcViewModel.onEvent(
                                WaterFtCalcEvent.ChangeAmt(
                                    selectedIngredient.id,
                                    "${waterFtCalcViewModel.selectedIngredientAmt.value.toInt() + 1}"
                                )
                            )
                        }
                    }
                ) {
                    Icon(imageVector = Icons.Default.Add, contentDescription = "add_icon")
                }


            }


        }
    }



    Column(
        modifier = Modifier.fillMaxWidth()
    ) {

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            modifier = Modifier.padding(horizontal = 30.dp),
            text = "What did you eat\ntoday?",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(20.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            contentPadding = PaddingValues(horizontal = 30.dp),
            horizontalArrangement = Arrangement.spacedBy(25.dp),
            verticalArrangement = Arrangement.spacedBy(25.dp)
        ) {

            item {
                Spacer(modifier = Modifier.height(1.dp))
            }
            item {
                Spacer(modifier = Modifier.height(1.dp))
            }

            items(ingredientStateList.value, key = { it.id }) {
                IngredientItem(
                    ingredient = it,
                    onSelectIngredient = {
                        if (waterFtCalcViewModel.selectedIngredientId.intValue == 0) {
                            //waterFtCalcViewModel.onEvent(WaterFtCalcEvent.SelectIngredient(it.id))
                        }
                        isBottomSheetOpened = true
                    },
                )
            }

        }

        Spacer(modifier = Modifier.height(15.dp))

        Button(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .align(Alignment.End),
            onClick = {
                if (waterFtCalcViewModel.selectedIngredientId.intValue == 0) {
                    waterFtCalcViewModel.onEvent(WaterFtCalcEvent.Complete)
                }
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0XFF216869)
            )
        ) {

            if (!waterFtCalcViewModel.isIngredientsAmtUploading.value) {
                Text(text = "Done!")
            } else {
                CircularProgressIndicator()
            }

        }
    }
}


@Composable
fun IngredientItem(
    ingredient: IngredientCalcState,
    onSelectIngredient: () -> Unit = {},
) {


    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(170.dp)
            .clickable { onSelectIngredient() },

        ) {

        Box(modifier = Modifier.fillMaxSize()) {
            Column(
                modifier = Modifier
                    .fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                Image(
                    modifier = Modifier.size(130.dp),
                    painter = painterResource(id = R.drawable.wheat),
                    colorFilter = ColorFilter.tint(Color.Gray),
                    contentDescription = "wheat_img"
                )


                Text(
                    text = ingredient.name,
                    style = TextStyle(
                        fontSize = 15.sp,
                        fontFamily = puddleFontFamily,
                        fontWeight = FontWeight.Normal,
                        fontStyle = FontStyle.Normal
                    )
                )
            }

            if (ingredient.amt.isNotBlank()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.tertiary)
                        .padding(5.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = ingredient.amt + " " + ingredient.unit,
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 20.sp,
                            fontFamily = puddleFontFamily
                        )
                    )
                }
            }
        }







    }



}



