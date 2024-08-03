package org.arghyam.puddle.presentation.waterfootprint_calculator

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.arghyam.puddle.R

@Preview(showBackground = true)
@Composable
fun WaterFootprintResultScreen(
    waterFootPrint: Float = 0f,
    onNavigate: (String) -> Unit = {},

    ) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF00072D))
            .padding(horizontal = 20.dp)
    ) {

        Spacer(modifier = Modifier.height(20.dp))
        Text(
            text = "Your diet water footprint is",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(15.dp))
        Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
            Image(
                modifier = Modifier.size(250.dp),
                painter = painterResource(id = R.drawable.vector_water_ft_result),
                contentDescription = "water_footprint_result"
            )
            Text(
                text = "${waterFootPrint}\nliters",
                style = TextStyle(
                    textAlign = TextAlign.Center,
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily,
                    fontSize = 36.sp,
                    color = Color(0xFFDCE1DE),
                    lineHeight = 40.sp
                )
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            modifier = Modifier.fillMaxWidth(),
            text = "which is the same as",
            textAlign = TextAlign.Center,
            style = TextStyle(
                fontWeight = FontWeight.Medium,
                textAlign = TextAlign.Center,
                fontStyle = FontStyle.Normal,
                fontFamily = openSansFontFamily,
                fontSize = 18.sp,
                color = Color(0xFFDCE1DE),
            )
        )
        Text(
            modifier = Modifier.fillMaxWidth(),
            text = "30 bathtubs\n filled to the brim",
            textAlign = TextAlign.Center,
            style = TextStyle(
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center,
                fontStyle = FontStyle.Normal,
                fontFamily = openSansFontFamily,
                fontSize = 22.sp,
                color = Color(0xFFDCE1DE),
            )
        )


        Spacer(modifier = Modifier.height(30.dp))

        Text(
            modifier = Modifier.fillMaxWidth(),
            text = "Want to learn how to\n" + "score better?",
            textAlign = TextAlign.Center,
            style = TextStyle(
                fontWeight = FontWeight.Medium,
                textAlign = TextAlign.Center,
                fontStyle = FontStyle.Normal,
                fontFamily = openSansFontFamily,
                fontSize = 18.sp,
                color = Color(0xFFDCE1DE),
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        Button(
            modifier = Modifier
                .fillMaxWidth()
                .align(Alignment.End),
            onClick = {

            },
            shape = RoundedCornerShape(15.dp),
            contentPadding = PaddingValues(horizontal = 22.dp, vertical = 12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0XFF216869)
            )
        ) {

            Text(
                text = "Ways to Reduce",
                style = TextStyle(
                    fontFamily = puddleFontFamily,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 18.sp
                )
            )

        }

        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Button(
                modifier = Modifier
                    .height(60.dp)
                    .weight(1f),
                onClick = {
                    onNavigate(Routes.CalculateScreen.route)
                },
                shape = RoundedCornerShape(15.dp),
                //contentPadding = PaddingValues(horizontal = 22.dp, vertical = 12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0XFF216869)
                )
            ) {

                Text(
                    text = "Calculate Again",
                    style = TextStyle(
                        textAlign = TextAlign.Center,
                        fontFamily = puddleFontFamily,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp
                    )
                )

            }

            Button(
                modifier = Modifier
                    .height(60.dp)
                    .weight(1f),
                onClick = {

                },
                shape = RoundedCornerShape(15.dp),
                //contentPadding = PaddingValues(horizontal = 22.dp, vertical = 12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0XFF216869)
                )
            ) {

                Text(
                    text = "Leaderboard", style = TextStyle(
                        fontFamily = puddleFontFamily,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp
                    )
                )


            }
        }


    }

}