package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.widget.Toast
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.text2.BasicTextField2
import androidx.compose.foundation.text2.input.TextFieldLineLimits
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import org.arghyam.puddle.R
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.CornerType
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.LayoutOne
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.puddleFontFamily
import kotlinx.coroutines.flow.collectLatest
import org.arghyam.puddle.BuildConfig
import org.koin.androidx.compose.koinViewModel

@OptIn(ExperimentalFoundationApi::class)
@Preview
@Composable
fun Test4(
    waterFtCalcViewModel: WaterFtCalcViewModel = koinViewModel(),
    onNavigate: (String) -> Unit = {}
) {

    val selectedIngId = waterFtCalcViewModel.selectedIngredientId.intValue


    val fetchIngredientsState = waterFtCalcViewModel.fetchIngredientsState.collectAsState()

    val context = LocalContext.current

    LaunchedEffect(key1 = true) {
        waterFtCalcViewModel.onEvent(WaterFtCalcEvent.FetchIngredients)

        waterFtCalcViewModel.eventFlow.collectLatest { event ->

            when(event) {
                is WaterFtCalcUiEvent.WaterFootprintCalculated -> {
                    Toast.makeText(context, "Water Footprint Calculated", Toast.LENGTH_SHORT).show()
                    onNavigate(Routes.CalculateResultScreen.route + "?" + "water_footprint=${event.result}")
                }
                is WaterFtCalcUiEvent.WaterFootprintCalculationFailed -> {
                    Toast.makeText(context, "Water Footprint Calculation Failed", Toast.LENGTH_SHORT).show()
                }

                else -> Unit
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(color = Color(0XFF00072D))
            .verticalScroll(rememberScrollState()),

        ) {

        Text(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 10.dp),
            text = "What did you eat\ntoday?",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        fetchIngredientsState.value.data.forEach { row ->
            LayoutOne(
                height = if (selectedIngId == 1) {
                    500
                } else if (selectedIngId == 2) {
                    1520
                } else {
                    3000
                },
                row = row
            ) {

                row.items.forEach { item ->



                    Column(modifier = Modifier
                        .layoutId(item.name)) {
                        Box(
                            //modifier = Modifier
                                //.layoutId(item.name),
                            contentAlignment = Alignment.Center
                        ) {

                            AsyncImage(
                                modifier = Modifier
                                    .scale(
                                        if (selectedIngId == item.id && selectedIngId != 0) {
                                            item.scaleFactor
                                        } else {
                                            if (selectedIngId == 0) {
                                                item.scaleFactor
                                            } else {
                                                item.scaleFactor - 0.15f
                                            }

                                        }
                                    )
                                    .clickable(enabled = selectedIngId == 0) {

                                        waterFtCalcViewModel.onEvent(
                                            WaterFtCalcEvent.SelectIngredient(
                                                item.id!!
                                            )
                                        )
                                    }
                                    .blur(if (selectedIngId != item.id && selectedIngId != 0) 3.dp else 0.dp),
                                model = if (selectedIngId == item.id) "${BuildConfig.SERVER_URL}${item.selectedBgImageUrl.replace("xml", "png")}" else "${BuildConfig.SERVER_URL}${item.unselectedBgImageUrl.replace("xml", "png")}",
                                contentDescription = item.name + "image",
                            )
                            Column(
                                modifier = Modifier.blur(if (selectedIngId != item.id && selectedIngId != 0) 3.dp else 0.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(5.dp)
                            ) {


                                val existingAmt = waterFtCalcViewModel.findAmtOfIngredient(item.id!!)
                                if (selectedIngId != item.id && existingAmt != "0" && !existingAmt.isNullOrBlank()) {
                                    AsyncImage(
                                        modifier = Modifier
                                            .size(
                                                if (selectedIngId == 0) {
                                                    item.sampleImageSize.dp
                                                } else {
                                                    item.sampleImageSize.dp - 20.dp
                                                }
                                            ),
                                        model = "${BuildConfig.SERVER_URL}${item.sampleImageUrl}",
                                        contentDescription = item.name + "image",
                                    )
                                } else {
                                    BasicTextField2(
                                        modifier = Modifier.width(40.dp),
                                        enabled = selectedIngId == item.id,
                                        value = if (selectedIngId == item.id) waterFtCalcViewModel.selectedIngredientAmt.value + item.unit else existingAmt + item.unit,
                                        onValueChange = {
                                            if (it != "-" && it != " " && it != "." && it != ",") {
                                                waterFtCalcViewModel.onEvent(
                                                    WaterFtCalcEvent.ChangeAmt(
                                                        item.id,
                                                        it.trim(item.unit.last())
                                                    )
                                                )
                                            }
                                        },
                                        textStyle = TextStyle(
                                            color = Color.White,
                                            fontFamily = puddleFontFamily,
                                            fontSize = if (selectedIngId == item.id && selectedIngId != 0) {
                                                22.sp
                                            } else {
                                                if (selectedIngId == 0) {
                                                    22.sp
                                                } else {
                                                    18.sp
                                                }

                                            }
                                        ),
                                        lineLimits = TextFieldLineLimits.SingleLine,
                                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                                        cursorBrush = SolidColor(MaterialTheme.colorScheme.onPrimary)

                                    )
                                }


                                Text(
                                    text = item.name,
                                    style = TextStyle(
                                        color = Color.White,
                                        fontFamily = puddleFontFamily,
                                        fontSize = 15.sp
                                    )
                                )
                            }


                            if (item.id == selectedIngId) {
                                IconButton(modifier = Modifier
                                    .offset(item.doneXOffSet.dp, item.doneYOffSet.dp)
                                    .scale(item.iconScaleFactor)
                                    .align(Alignment.TopCenter),
                                    onClick = {
                                        waterFtCalcViewModel.onEvent(
                                            WaterFtCalcEvent.DoneAndUnSelectIngredient(
                                                item.id
                                            )
                                        )
                                    }) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.ic_done),
                                        contentDescription = "done",
                                        tint = Color.Unspecified
                                    )
                                }

                                IconButton(modifier = Modifier
                                    .offset(item.pluseXOffSet.dp, item.pluseYOffSet.dp)
                                    .scale(item.iconScaleFactor)
                                    .align(if (item.cornerType == CornerType.CENTER.name || item.cornerType == CornerType.LEFT.name) Alignment.CenterEnd else Alignment.CenterStart)
                                    ,
                                    onClick = {
                                        waterFtCalcViewModel.onEvent(
                                            WaterFtCalcEvent.ChangeAmt(
                                                item.id,
                                                "${waterFtCalcViewModel.selectedIngredientAmt.value.toInt() + 1}"
                                            )
                                        )
                                    }) {
                                    Icon(

                                        painter = painterResource(id = R.drawable.ic_inc),
                                        contentDescription = "add",
                                        tint = Color.Unspecified
                                    )
                                }

                                IconButton(modifier = Modifier
                                    .offset(item.minusXOffSet.dp, item.minusYOffSet.dp)
                                    .scale(item.iconScaleFactor)
                                    .align(if (item.cornerType == CornerType.RIGHT.name || item.cornerType == CornerType.LEFT.name) Alignment.BottomCenter else Alignment.CenterStart),
                                    onClick = {
                                        waterFtCalcViewModel.onEvent(
                                            WaterFtCalcEvent.ChangeAmt(
                                                item.id,
                                                "${waterFtCalcViewModel.selectedIngredientAmt.value.toInt() - 1}"
                                            )
                                        )
                                    }) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.ic_dec),
                                        contentDescription = "minus",
                                        tint = Color.Unspecified
                                    )
                                }
                            }

                        }
                    }


                }


            }


        }

        Spacer(modifier = Modifier.height(50.dp))
        Row(
            modifier = Modifier.padding(10.dp).fillMaxWidth(),
            horizontalArrangement = Arrangement.End
        ) {
            Button(
                shape = RoundedCornerShape(15.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color5
                ),
                onClick = { waterFtCalcViewModel.onEvent(WaterFtCalcEvent.Complete)}
            ) {
                Text(
                    text = "Done!",
                    style = TextStyle(
                        fontSize = 25.sp,
                        fontFamily = puddleFontFamily,
                        fontStyle = FontStyle.Normal,
                        fontWeight = FontWeight.Bold,
                        color = Color3
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(100.dp))


    }

}