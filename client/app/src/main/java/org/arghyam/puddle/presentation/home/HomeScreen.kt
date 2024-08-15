package org.arghyam.puddle.presentation.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.constraintlayout.compose.ConstraintSet
import org.arghyam.puddle.R
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Preview(showSystemUi = true)
@Composable
fun HomeScreen() {

    BoxWithConstraints(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0XFF00072D))
    ) {
        val constraints = if (minWidth < 600.dp) {
            decoupledConstraints(margin = 16.dp) // Portrait constraints
        } else {
            decoupledConstraints(margin = 32.dp) // Landscape constraints
        }

        ConstraintLayout(
            modifier = Modifier
                .fillMaxSize(),
            constraintSet = constraints
        ) {

            Text(
                modifier = Modifier
                    .layoutId(HelloText),
                text = "Hello!",
                style = TextStyle(
                    color = Color(0XFFEEF9BF),
                    fontSize = 32.sp,
                    fontWeight = FontWeight.W800,
                    fontFamily = puddleFontFamily,
                    lineHeight = 35.2.sp
                )
            )
            Box(
                modifier = Modifier
                    .width(180.dp)
                    .height(220.dp)
                    .layoutId(CalculatorRef),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier.fillMaxSize(),
                    painter = painterResource(id = R.drawable.v1),
                    contentDescription = "test v1"
                )

                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Image(
                        modifier = Modifier.size(150.dp),
                        painter = painterResource(id = R.drawable.v1_icon),
                        contentDescription = "test v1"
                    )
                    Text(
                        modifier = Modifier.offset(y = -15.dp),
                        text = "Calculate",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 18.sp
                        )
                    )
                }


            }

            Box(
                modifier = Modifier
                    .width(190.dp)
                    .height(220.dp)
                    .layoutId(PlanRef),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier.fillMaxSize(),
                    painter = painterResource(id = R.drawable.v2),
                    contentDescription = "test v2"
                )

                Column(
                    modifier = Modifier.fillMaxSize().offset(x = 10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Image(
                        modifier = Modifier.size(120.dp),
                        painter = painterResource(id = R.drawable.v2_icon),
                        contentDescription = "test v2"
                    )
                    Text(
                        modifier = Modifier.offset(y = -15.dp),
                        text = "Plan",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 18.sp
                        )
                    )
                }


            }

            Box(
                modifier = Modifier
                    .width(190.dp)
                    .height(220.dp)
                    .layoutId(DiscoverRef),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier.fillMaxSize(),
                    painter = painterResource(id = R.drawable.v3),
                    contentDescription = "test v3"
                )

                Column(
                    modifier = Modifier.fillMaxSize().offset(x = -10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Image(
                        modifier = Modifier.size(120.dp),
                        painter = painterResource(id = R.drawable.v3_icon),
                        contentDescription = "test v3"
                    )
                    Text(
                        modifier = Modifier.offset(y = -15.dp),
                        text = "Discover",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 18.sp
                        )
                    )
                }


            }

            Box(
                modifier = Modifier
                    .width(190.dp)
                    .height(220.dp)
                    .layoutId(ProfileRef),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier.fillMaxSize(),
                    painter = painterResource(id = R.drawable.v4),
                    contentDescription = "test v4"
                )

                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Image(
                        modifier = Modifier.size(120.dp),
                        painter = painterResource(id = R.drawable.v4_icon),
                        contentDescription = "test v4"
                    )
                    Text(
                        modifier = Modifier.offset(y = -15.dp),
                        text = "Profile",
                        style = TextStyle(
                            color = Color.White,
                            fontSize = 18.sp
                        )
                    )
                }


            }


        }
    }


}

private fun decoupledConstraints(
    margin: Dp
): ConstraintSet = ConstraintSet {

    val helloTxt = createRefFor(HelloText)
    val calc =createRefFor(CalculatorRef)
    val plan =createRefFor(PlanRef)
    val discover =createRefFor(DiscoverRef)
    val profile =createRefFor(ProfileRef)

    constrain(helloTxt) {
        start.linkTo(parent.start, 20.dp)
        //end.linkTo(parent.end)
        top.linkTo(parent.top, 50.dp)
    }
    constrain(calc) {
        start.linkTo(parent.start)
        //end.linkTo(parent.end)
        top.linkTo(parent.top, 150.dp)
    }
    constrain(plan) {
        //start.linkTo(parent.start)
        end.linkTo(parent.end)
        top.linkTo(parent.top, 260.dp)
    }
    constrain(discover) {
        start.linkTo(parent.start)
        //end.linkTo(parent.end)
        top.linkTo(parent.top, 390.dp)
    }

    constrain(profile) {
        //start.linkTo(parent.start)
        end.linkTo(parent.end)
        top.linkTo(parent.top, 540.dp)
    }
}

private const val HelloText = "hello_txt"
private const val CalculatorRef = "calculator"
private const val PlanRef = "plan"
private const val DiscoverRef = "discover"
private const val ProfileRef = "profile"