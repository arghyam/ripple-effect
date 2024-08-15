package org.arghyam.puddle.presentation.plan

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Preview
@Composable
fun PlanScreen(

) {

    Column(
        modifier = Modifier.fillMaxSize().background(color = Color1).padding(horizontal = 20.dp, vertical = 20.dp),
    ) {

        Text(
            text = "Plan",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(100.dp))

        Image(
            modifier = Modifier.scale(2.6f).align(Alignment.CenterHorizontally),
            painter = painterResource(id = R.drawable.plan_option_1),
            contentDescription = "plan option 1"
        )
        Spacer(modifier = Modifier.height(90.dp))
        Image(
            modifier = Modifier.scale(2.6f).align(Alignment.CenterHorizontally),
            painter = painterResource(id = R.drawable.plan_option_2),
            contentDescription = "plan option 2"
        )
        Spacer(modifier = Modifier.height(90.dp))
        Image(
            modifier = Modifier.scale(2.6f).align(Alignment.CenterHorizontally),
            painter = painterResource(id = R.drawable.plan_option_3),
            contentDescription = "plan option 3"
        )
    }
}