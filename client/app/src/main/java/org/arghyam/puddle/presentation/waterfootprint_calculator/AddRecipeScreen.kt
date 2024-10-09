package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.util.Log
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.IconButton
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Done
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.puddleFontFamily
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import kotlinx.serialization.Serializable
import org.arghyam.puddle.R
import org.arghyam.puddle.data.dto.responses.water_ft_calculator.IngredientRow
import org.arghyam.puddle.domain.models.Ingredient
import org.arghyam.puddle.domain.models.Recipe
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.Color6
import org.koin.androidx.compose.koinViewModel

@Composable
fun AddRecipeScreen(
    recipe: Recipe,
    onIncrement: () -> Unit,
    onDecrement: () -> Unit,
    onChangeAmt: (Int) -> Unit,
    onNavigateBack: () -> Unit = {}
) {

    var quantity by remember {
        mutableIntStateOf(0)
    }

    var showCalcWindow by remember {
        mutableStateOf(false)
    }

    Box(
        modifier = Modifier
            .fillMaxSize()

    ) {

        Column(
            modifier = Modifier
                .fillMaxSize()
                .align(Alignment.TopStart)
        ) {
            Image(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(300.dp),
                painter = painterResource(R.drawable.ragi_dhosa),
                contentDescription = "ragi dhosa",
                contentScale = ContentScale.Crop
            )
            Spacer(modifier = Modifier.height(10.dp))

            Text(
                modifier = Modifier.padding(horizontal = 20.dp),
                text = recipe.name,
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = puddleFontFamily,
                    fontSize = 32.sp,
                    color = Color5,
                    lineHeight = 35.2.sp
                )
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                modifier = Modifier.padding(horizontal = 20.dp),
                text = "Ingredients",
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = puddleFontFamily,
                    fontSize = 25.sp,
                    color = Color6,
                    lineHeight = 35.2.sp
                )
            )

            Spacer(modifier = Modifier.height(10.dp))

            LazyColumn(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 20.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Name",
                            style = TextStyle(
                                fontWeight = FontWeight.Normal,
                                fontFamily = puddleFontFamily,
                                fontSize = 15.sp,
                                color = Color6,
                            )
                        )

                        Text(
                            modifier = Modifier
                                .background(Color5)
                                .padding(horizontal = 5.dp, vertical = 2.dp),
                            text = "Quantity",
                            style = TextStyle(
                                fontWeight = FontWeight.Normal,
                                fontFamily = puddleFontFamily,
                                fontSize = 15.sp,
                                color = Color3,

                                )
                        )

                    }
                }
                items(recipe.ingredients, key = {it.id}) { ingredient ->
                    IngredientRow(
                        ingredient
                    )
                }
            }




        }

        Box(
            modifier = Modifier
                .align(Alignment.TopStart)

        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color3.copy(0.68f))
                    .padding(start = 20.dp, end = 20.dp, top = 10.dp, bottom = 10.dp)
                ,
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(20.dp)
            ) {

                IconButton(onNavigateBack) {
                    Icon(
                        modifier = Modifier.size(25.dp),
                        painter = painterResource(R.drawable.back_btn),
                        tint = Color5,
                        contentDescription = "cancel"
                    )
                }

                Text(
                    modifier = Modifier
                    ,
                    text = recipe.name,
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontFamily = puddleFontFamily,
                        fontSize = 25.sp,
                        color = Color.White,
                        lineHeight = 35.2.sp
                    )
                )


            }
        }


        Box(
            modifier = Modifier
                .align(Alignment.BottomStart)

        ) {

            if(showCalcWindow) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(70.dp)
                        .padding(top = 20.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {

                    IconButton(
                        modifier = Modifier.size(50.dp),
                        onClick = {
                            quantity--
                            onDecrement()
                        }
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.baseline_remove_24),
                            contentDescription = "remove",
                            tint = Color6
                        )
                    }

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        TextField(
                            value = "$quantity",
                            onValueChange = { update ->
                                //check for value is integer
                                val trimmedUpdate = update.trim().ifBlank { "0" }
                                if(trimmedUpdate.contains(".") || trimmedUpdate.contains(",") || trimmedUpdate.contains("-") || trimmedUpdate.contains(" ")) {
                                    //popup
                                    Log.d("Addrecipe" , "trimmed value is not satisfied: $trimmedUpdate")
                                } else {
                                    quantity = trimmedUpdate.toInt()
                                    onChangeAmt(quantity)
                                }

                            },
                            textStyle = TextStyle(
                                fontSize = 20.sp,
                                fontFamily = puddleFontFamily,
                                textAlign = TextAlign.Center,fontWeight = FontWeight.W200,

                                ),
                            singleLine = true,
                            modifier = Modifier
                                .fillMaxWidth(0.30f)
                                .height(60.dp)
                                .clip(RoundedCornerShape(15.dp)),
                            keyboardOptions = KeyboardOptions(
                                imeAction = ImeAction.Done,
                                keyboardType = KeyboardType.Number
                            ),
                            colors = TextFieldDefaults.colors(
                                focusedIndicatorColor = Color.Transparent,
                                unfocusedIndicatorColor = Color.Transparent,
                                unfocusedContainerColor = Color5,
                                focusedContainerColor = Color5,
                                focusedTextColor = Color3,
                                unfocusedTextColor = Color3,
                                cursorColor = Color6
                            )

                        )

                        Text(
                            text = "in Plate",
                            style = TextStyle(
                                color = Color6,
                                fontSize = 20.sp,
                                fontFamily = puddleFontFamily,
                                fontWeight = FontWeight.W200,
                            )
                        )

                    }


                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ){
                        IconButton(
                            modifier = Modifier.size(50.dp),
                            onClick = {
                                quantity++
                                onIncrement()
                            }
                        ) {
                            Icon(imageVector = Icons.Default.Add, contentDescription = "add_icon", tint = Color6)
                        }
                        IconButton(
                            modifier = Modifier.size(50.dp),
                            onClick = {
                                showCalcWindow = false
                            }
                        ) {
                            Icon(imageVector = Icons.Default.Done, contentDescription = "done_icon", tint = Color6)
                        }
                    }


                }
            } else {
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
                        showCalcWindow = true
                    },
                    shape = RoundedCornerShape(0.dp)
                ) {

                    Text(
                        modifier = Modifier.fillMaxWidth(),
                        text = if(quantity == 0) "Add Quantity" else "Edit Quantity: $quantity",
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

}


@Composable
fun IngredientRow(
    ingredient: Ingredient,
) {

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = ingredient.name,
            style = TextStyle(
                fontWeight = FontWeight.Normal,
                fontFamily = puddleFontFamily,
                fontSize = 15.sp,
                color = Color6,
            )
        )

        Text(
            modifier = Modifier
                .background(Color5)
                .padding(horizontal = 5.dp, vertical = 2.dp),
            text = "${ingredient.quantity} " + ingredient.unit,
            style = TextStyle(
                fontWeight = FontWeight.Normal,
                fontFamily = puddleFontFamily,
                fontSize = 15.sp,
                color = Color3,

            )
        )

    }

}

@Preview
@Composable
private fun PreviewAddRecipe() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = Color1
    ) {
//        AddRecipeScreen(
//            recipeName = "Ragi Dhosa",
//            recipeQuantity = "2 Cup",
//            recipeWaterFootprint = 200
//        )


    }
}