package org.arghyam.puddle.presentation.quiz

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color6
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Composable
fun QuizResultScreen(
    quizScore: Int,
    totalQuestions: Int,
    onNavigateBack:() -> Unit = {}
) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp),
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
            text = "Quiz",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            text = "Woohoo! You did great!",
            style = TextStyle(
                color = Color6,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
            )
        )

        Spacer(modifier = Modifier.height(120.dp))

        Box(modifier = Modifier.align(Alignment.CenterHorizontally), contentAlignment = Alignment.Center) {
            Image(
                modifier = Modifier.scale(3f),
                painter = painterResource(id = R.drawable.quiz_score_bg),
                contentDescription = "quiz_score_bg"
            )
            Text(
                text = "${quizScore} out of ${totalQuestions}",
                style = TextStyle(
                    color = Color.White,
                    fontFamily = puddleFontFamily,
                    fontSize = 34.sp,
                    fontWeight = FontWeight.Bold
                )
            )
        }

        Spacer(modifier = Modifier.height(30.dp))
        Text(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            text = "Your Score",
            style = TextStyle(
                color = Color.White,
                fontFamily = openSansFontFamily,
                fontSize = 22.sp,
                fontWeight = FontWeight.Normal
            )
        )


    }

}