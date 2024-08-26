package org.arghyam.puddle.presentation.discover

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily


@Composable
fun ArticleScreen(
    onNavigateBack: () -> Unit
) {

    val scrollState = rememberScrollState()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
            .verticalScroll(scrollState),
    ) {

        IconButton(
            modifier = Modifier.offset(-10.dp),
            onClick = onNavigateBack,
            colors = IconButtonDefaults.iconButtonColors(
                contentColor = Color.White
            )
        ) {
            Icon(
                modifier = Modifier.size(30.dp),
                painter = painterResource(id = R.drawable.back_btn),
                contentDescription = "back_btn",
            )
        }

        Text(
            text = "The water that you eat",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(20.dp))

        Column {
            Text(
                text = "Need to shift to a more sustainable diet without compromising on major nutrients and calories",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily,
                    fontSize = 13.sp,
                    color = Color.White,
                    lineHeight = 17.7.sp
                )
            )
            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = "written by Manu Srivastava, Manisha Shah via India Water Portal",
                style = TextStyle(
                    fontWeight = FontWeight.Normal,
                    fontFamily = openSansFontFamily,
                    fontSize = 13.sp,
                    color = Color.White,
                    lineHeight = 17.7.sp
                )

            )
            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = "What was your water consumption today?\n" +
                    "\n" +
                    "If I were to quickly calculate this, I would add up the litres of water I drank, the water I used up in cooking, washing, cleaning, and bathing; and quickly tell you that I used up around 80 litres of water. Your total would also be somewhere in the ballpark.\n" +
                    "\n" +
                    "But your actual water consumption is higher than this - much, much higher.\n" +
                    "We only think of water we use in its liquid form, mostly flowing from our taps. But what is surprising about this is that our virtual water consumption i.e., the hidden or indirect water in the products and services we consume, occurs in many forms and in large quantities and yet it goes blatantly unnoticed.\n" +
                    "\n" +
                    "Let’s talk about our food. It makes up the major chunk of our total water consumption every day. I started calculating my virtual water consumption in the form of food on a usual day and my “balanced diet” seems to take my daily consumption to 1700 litres!\n" +
                    "\n" +
                    "This is where things get problematic and unsustainable. The current per capita water availability in India is roughly 1486 litres per day and it is projected to fall to 1340 in 2025, and to 1140 litres in 2050. With further increase in population, urbanization, and higher disposable incomes, the average virtual water consumption will continue to rise and eventually push our water resource management systems to a breaking point.\n" +
                    "\n" +
                    "But we must try, for the sake of our future, and the generations to come. We can do our bit, without much effort or major sacrifices.\n" +
                    "Imagine that nature has given you 1340 litres of water to spend in a day i.e. roughly 9,000 litres a week.\n" +
                    "\n" +
                    "Calculate your daily water consumption including the food you eat. You can use this simple tool to get an approximate value. Multiply it by 7. Are you well within your weekly budget?\n" +
                    "See if you can reduce a few items or use less water-intensive substitutes. Let’s say, cutting down on the total sugar you take in your daily tea or coffee. Or bajra rotla instead of wheat rotis once in a while. Or reduce the frequency of eggs and chicken in your weekly diet. For the love of numbers, it takes 2000 litres of water to produce 1 kg of sugar, and only 400 litres for a kilogram of ragi.\n" +
                    "Make it a habit to calculate the virtual water in your key food items and educate your family, especially the younger ones so that they not only budget for monetary expenses but also for water in future and make better choices.\n" +
                    "Pat yourself on the back when you are well within your weekly budget because you have done your bit to conserve water.",
                style = TextStyle(
                    fontWeight = FontWeight.Normal,
                    fontFamily = openSansFontFamily,
                    fontSize = 16.sp,
                    color = Color.White,
                    lineHeight = 21.79.sp
                )
            )
        }

    }
}