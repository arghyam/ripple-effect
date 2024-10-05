package org.arghyam.puddle.presentation.waterfootprint_calculator

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.zIndex
import kotlinx.coroutines.flow.collectLatest
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcEvent
import org.arghyam.puddle.presentation.waterfootprint_calculator.events.WaterFtCalcUiEvent
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.Color4
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.koin.androidx.compose.koinViewModel

@OptIn(ExperimentalFoundationApi::class)
@Preview
@Composable
fun WFCScreen2(
    waterFtCalcViewModel: WaterFtCalcViewModel = koinViewModel(),
    onNavigate: (String) -> Unit = {}
) {

    var amt by remember {
        mutableIntStateOf(0)
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
                color = Color5,
                lineHeight = 35.2.sp
            )
        )

        IconButton(modifier = Modifier
            .align(Alignment.CenterHorizontally)
            .zIndex(5f),
            onClick = {

            }) {
            Icon(
                painter = painterResource(id = R.drawable.ic_done),
                contentDescription = "done",
                tint = Color.Unspecified
            )
        }

        Row(
            modifier = Modifier
                .align(Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically
        ) {

            IconButton(modifier = Modifier,
                onClick = {
                    if (amt > 0) {
                        amt--
                    }
                }) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_dec),
                    contentDescription = "done",
                    tint = Color.Unspecified
                )
            }

            Box(
                modifier = Modifier
                    .size(150.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Color4)

            ) {
                Column(
                    modifier = Modifier
                        .align(Alignment.Center),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "${amt} kg",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 20.sp
                        )
                    )
                    Text(
                        text = "Misal Pav",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 20.sp
                        )
                    )
                }

            }


            IconButton(modifier = Modifier,
                onClick = {
                    amt++
                }) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_inc),
                    contentDescription = "done",
                    tint = Color.Unspecified
                )
            }


        }

        Row(
            modifier = Modifier
                .padding(10.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
        ) {
            Button(
                shape = RoundedCornerShape(15.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color5
                ),
                onClick = {
                    onNavigate(Routes.CalculateResultScreen.route + '?' + "water_footprint=${calculateWTF(amt)}")
                }
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

    }

}

fun calculateWTF(amt: Int): Int {



    var totalUnitWeightOfIngre =  0
    var wtfInLiters = 0
    waterFtList.forEach { wtf ->

        val ing = ingListForMisalPav2.firstOrNull {
            wtf.first == it.first
        }

        if (ing != null) {
            totalUnitWeightOfIngre += ing.second.trim('g').toInt()
            wtfInLiters += wtf.second.second
        }
    }

    val sum = (wtfInLiters * amt) / totalUnitWeightOfIngre

    return sum

}


val ingListForMisalPav = listOf(
    "Sprouted moong" to "100g",
    "boiled potato" to "100g",
    "spices-4" to "4g",
    "pav bread" to "100g"
)

val ingListForMisalPav2 = listOf(
    "lentil" to "100g",
    "Potato" to "100g",
    "Spices" to "4g",
    "Wheat" to "100g"
)

val waterFtList = listOf(
    "lentil" to ("1000g" to 100),
    "Potato" to ("1000g" to 100),
    "Spices" to ("1g" to 10),
    "Wheat" to ("1000g" to 1500)
)


