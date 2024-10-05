package org.arghyam.puddle.presentation.waterfootprint_calculator

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.paging.compose.collectAsLazyPagingItems
import kotlinx.coroutines.flow.collectLatest
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.koin.androidx.compose.koinViewModel
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalculatorScreen(
    onNavigate: (String) -> Unit = {},
    viewModel: WaterFtCalcViewModel = koinViewModel()
) {

    val query by viewModel.query.collectAsState()
    val recipes = viewModel.mRecipes.collectAsLazyPagingItems()
    val recipeWithQuantityList by viewModel.recipesWithQuantityState.collectAsState()
    val context = LocalContext.current

    var isSRTopBarVisible by remember { mutableStateOf(false) }

    LaunchedEffect(true) {
        viewModel.eventFlow.collectLatest {
            when(it) {
                is WaterFtCalcUiEvent.WaterFootprintCalculated ->{
                    onNavigate(Routes.CalculateResultScreen.route + "?" + "water_footprint=${it.result}")
                }

                WaterFtCalcUiEvent.WFCOnboardCompleted -> TODO()
                WaterFtCalcUiEvent.WaterFootprintCalculationFailed -> TODO()
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()

    ) {


        LazyVerticalGrid(
            modifier = Modifier.fillMaxWidth().padding(start = 20.dp, end = 20.dp, top = 110.dp, bottom = 10.dp),
            columns = GridCells.Fixed(2),
            horizontalArrangement = Arrangement.spacedBy(15.dp),
            verticalArrangement = Arrangement.spacedBy(15.dp)
        ) {

            items( recipes.itemSnapshotList.items, key = {it.id}) { recipe ->

                recipe.let {
                    val existingRecipeWithQuantity = recipeWithQuantityList.firstOrNull { it.recipeId == recipe.id }

                    Recipe(
                        recipe.id,
                        recipe.name,
                        recipe.water_footprint,
                        existingRecipeWithQuantity != null,
                        "${existingRecipeWithQuantity?.quantity} Plate",
                        "1 Plate"
                    ) {
                        onNavigate("${Routes.AddRecipeScreen.route}?recipe_id=${recipe.id}")
                    }
                }

            }
        }

        Box(
            modifier = Modifier
                .align(Alignment.TopStart)

        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
            ) {

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color3.copy(0.68f))
                        .padding(start = 20.dp, end = 20.dp, top = 10.dp, bottom = 10.dp)
                    ,
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Icon(
                            modifier = Modifier.size(20.dp),
                            painter = painterResource(R.drawable.back_btn),
                            tint = Color5,
                            contentDescription = "cancel"
                        )
                        Text(
                            modifier = Modifier
                            ,
                            text = "Add Recipes",
                            style = TextStyle(
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = puddleFontFamily,
                                fontSize = 25.sp,
                                color = Color.White,
                                lineHeight = 35.2.sp
                            )
                        )
                    }

                    Text(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color5)
                            .padding(5.dp)

                        ,
                        text = String.format(Locale.getDefault(),"%02d", recipeWithQuantityList.size),
                        style = TextStyle(
                            fontWeight = FontWeight.Bold,
                            fontFamily = puddleFontFamily,
                            fontSize = 18.sp,
                            color = Color3,
                        )
                    )
                }


                val interactionSource = remember { MutableInteractionSource() }
                BasicTextField(
                    value = query,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(60.dp)
                        .padding(start = 20.dp, end = 20.dp, top = 10.dp, bottom = 10.dp)
                    ,
                    onValueChange = {
                        viewModel.onEvent(WaterFtCalcEvent.OnSearchQuery(it))
                    },
                    singleLine = true,
                    interactionSource = interactionSource ,

                    decorationBox = @Composable { innerTextField ->
                        // places leading icon, text field with label and placeholder, trailing icon
                        TextFieldDefaults.DecorationBox(
                            value = query,
                            visualTransformation = VisualTransformation.None,
                            innerTextField = innerTextField,
                            placeholder = {
                                Text("Search recipes..", fontSize = 12.sp)
                            },
                            enabled = true,
                            shape = RoundedCornerShape(15.dp),
                            singleLine = true,
                            interactionSource = interactionSource,
                            colors = TextFieldDefaults.colors(
                                focusedIndicatorColor = Color.Transparent,
                                unfocusedIndicatorColor = Color.Transparent
                            ),
                            contentPadding = PaddingValues(start = 10.dp, top = 0.dp, bottom = 0.dp, end = 10.dp)
                        )
                    }
                )
            }
        }

        Box(
            modifier = Modifier
                .align(Alignment.BottomStart)

        ) {
            Button(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
                ,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color3.copy(0.68f),
                    contentColor = Color(0xFF216869)
                ),
                onClick = {
                    viewModel.onEvent(WaterFtCalcEvent.CalcWaterFootprint)
                },
                shape = RoundedCornerShape(0.dp)
            ) {

                Text(
                    modifier = Modifier.fillMaxWidth(),
                    text = "Done",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 24.sp,
                        fontFamily = puddleFontFamily,
                        lineHeight = 21.79.sp,
                        textAlign = TextAlign.Center,
                        color = Color.White
                    )
                )

            }
        }


    }

}


@Composable
private fun Recipe(
    recipeId: String,
    recipeName: String,
    recipeWaterFootprint: Double,
    shouldShowRecipeQuant: Boolean,
    chosenQuantity: String,
    referenceQuant: String,
    onRecipeClick: () -> Unit = {}
) {

    Column(
        modifier = Modifier
            .height(250.dp)
            .clip(RoundedCornerShape(15.dp))
            .background(Color5.copy(0.79f))
            .clickable {
                onRecipeClick()
            }
            ,
    ) {
        Box(
            modifier = Modifier.fillMaxWidth(),
            contentAlignment = Alignment.TopStart
        ) {
            Image(
                modifier = Modifier
                    .size(160.dp)
                ,
                painter = painterResource(R.drawable.ragi_dhosa),
                contentDescription = "ragi dhosa",
                contentScale = ContentScale.Crop
            )

            if (shouldShowRecipeQuant) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(30.dp)
                        .background(Color3.copy(0.68f))
                        .padding(start = 10.dp, top = 5.dp, bottom = 5.dp)
                ) {

                    Text(
                        text = chosenQuantity,
                        style = TextStyle(
                            fontWeight = FontWeight.ExtraBold,
                            fontFamily = puddleFontFamily,
                            fontSize = 18.sp,
                            color = Color5,
                            lineHeight = 35.2.sp
                        )
                    )

                }
            }
        }


        Column(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 10.dp)
        ) {
            Text(
                text = recipeName,
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    color = Color3
                )
            )

            Text(
                text = "${recipeWaterFootprint}L",
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    color = Color3
                )
            )
            Text(
                text = referenceQuant,
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    color = Color3
                )
            )
        }
    }

}

@Preview
@Composable
private fun PreviewCalculator() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = Color1
    ) {
        CalculatorScreen()
    }
}

