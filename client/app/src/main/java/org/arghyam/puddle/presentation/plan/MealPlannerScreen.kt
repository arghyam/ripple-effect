package org.arghyam.puddle.presentation.plan

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
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
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.domain.models.MealPlanOfDay
import org.arghyam.puddle.domain.models.mealPlanOfWeek
import org.arghyam.puddle.presentation.auth.events.LoginEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily

@OptIn(ExperimentalFoundationApi::class)
@Preview
@Composable
fun MealPlannerScreen() {

    val pagerState = rememberPagerState { 7 }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
    ) {

        Text(
            text = "Here’s your 5 Day Meal Plan:",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        HorizontalPager(
            state = pagerState,
            verticalAlignment = Alignment.Top,
            modifier = Modifier
                .height(450.dp)
                .padding(top = 0.dp, bottom = 0.dp)

        ) { position ->
            MealPlannerPage(mealPlanOfWeek[position])
        }

        Spacer(modifier = Modifier.height(50.dp))

        Row(
            modifier = Modifier
                .fillMaxWidth()
            ,
            horizontalArrangement = Arrangement.Center
        ) {
            repeat(pagerState.pageCount) { iteration ->
                val color = if (pagerState.currentPage == iteration) Color.DarkGray else Color.LightGray
                Box(
                    modifier = Modifier
                        .padding(2.dp)
                        .clip(CircleShape)
                        .background(color)
                        .size(8.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            modifier = Modifier
                .align(Alignment.End)
                .fillMaxWidth(0.6f)
                .height(50.dp)
                .padding(horizontal = 10.dp)
                ,
            onClick = {
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0xFF216869)
            ),
            shape = RoundedCornerShape(15.dp)
        ) {
            Text(
                modifier = Modifier.fillMaxWidth(),
                text = "More recipes",
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 24.sp,
                    fontFamily = puddleFontFamily,
                    lineHeight = 21.79.sp,
                    textAlign = TextAlign.Center
                )
            )
        }


    }
}


@Composable
fun MealPlannerPage(
    dayPlan: MealPlanOfDay
) {

    Box(
        modifier = Modifier.height(420.dp)
    ) {
        Image(
            modifier = Modifier.size(450.dp),
            painter = painterResource(id = R.drawable.mealplan_bg),
            contentDescription = "meal planner bg"
        )

        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .offset(x = 20.dp, y = -30.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.size(100.dp),
                painter = painterResource(id = R.drawable.day_indicator),
                contentDescription = "snack bg"
            )

            Text(
                modifier = Modifier
                    .rotate(-20f)
                    .offset(y = -8.dp),
                text = dayPlan.dayName,
                style = TextStyle(
                    color = Color.White,
                    fontSize = 16.sp,
                    fontFamily = openSansFontFamily,
                    fontStyle = FontStyle.Normal,
                    fontWeight = FontWeight.ExtraBold
                )
            )
        }

        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .offset(x = 10.dp, y = 20.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.size(180.dp),
                painter = painterResource(id = R.drawable.breakfast_bg),
                contentDescription = "snack bg"
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Breakfast",
                    style = TextStyle(
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Italic
                    )
                )
                Image(
                    painter = painterResource(id = R.drawable.rava_idli),
                    contentDescription = "rava_idli",
                    modifier = Modifier
                        .size(100.dp)
                        .clip(
                            RoundedCornerShape(20.dp)
                        )
                )
                Text(
                    text = "Rava Idli",
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Normal,
                        fontWeight = FontWeight.Bold
                    )
                )
            }
        }

        Box(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .offset(x = -10.dp, y = 20.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.size(180.dp),
                painter = painterResource(id = R.drawable.lunch_bg),
                contentDescription = "lunch bg"
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Lunch",
                    style = TextStyle(
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Italic
                    )
                )
                Image(
                    painter = painterResource(id = R.drawable.rava_idli),
                    contentDescription = "rava_idli",
                    modifier = Modifier
                        .size(100.dp)
                        .clip(
                            RoundedCornerShape(20.dp)
                        )
                )
                Text(
                    text = "Baingan Bharta",
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Normal,
                        fontWeight = FontWeight.Bold
                    )
                )
            }
        }
        Box(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .offset(x = 10.dp, y = -20.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.size(180.dp),
                painter = painterResource(id = R.drawable.snack_bg),
                contentDescription = "snack bg"
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Snack",
                    style = TextStyle(
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Italic
                    )
                )
                Image(
                    painter = painterResource(id = R.drawable.rava_idli),
                    contentDescription = "rava_idli",
                    modifier = Modifier
                        .size(100.dp)
                        .clip(
                            RoundedCornerShape(20.dp)
                        )
                )
                Text(
                    text = "Spring rolls",
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Normal,
                        fontWeight = FontWeight.Bold
                    )
                )
            }
        }
        Box(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .offset(x = -20.dp, y = -20.dp),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.size(180.dp),
                painter = painterResource(id = R.drawable.dinner_bg),
                contentDescription = "dinner bg"
            )

            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Dinner",
                    style = TextStyle(
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Italic
                    )
                )
                Image(
                    painter = painterResource(id = R.drawable.rava_idli),
                    contentDescription = "rava_idli",
                    modifier = Modifier
                        .size(100.dp)
                        .clip(
                            RoundedCornerShape(20.dp)
                        )
                )
                Text(
                    modifier = Modifier.fillMaxWidth(0.4f),
                    text = "Yellow shrimp curry",
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        color = Color.White,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily,
                        fontStyle = FontStyle.Normal,
                        fontWeight = FontWeight.Bold
                    )
                )
            }
        }


        Box(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .offset(x = -20.dp, y = 110.dp)
        ) {

            Box(
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier.size(220.dp),
                    painter = painterResource(id = R.drawable.total_amt),
                    contentDescription = "total amt"
                )

                Text(
                    text = buildAnnotatedString {
                        append("Total: ")
                        withStyle(SpanStyle(fontWeight = FontWeight.ExtraBold)) {
                            append("950 litres")
                        }
                    },
                    style = TextStyle(
                        color = Color5,
                        fontSize = 24.sp,
                        fontFamily = puddleFontFamily,
//
                    )
                )
            }

        }
    }
}