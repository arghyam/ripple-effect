package org.arghyam.puddle.presentation.quiz

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.domain.models.Question
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color6
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily


@Composable
fun QuestionScreen(
    questionnaire: List<Question>,
    question: Question,
    selectedOptionId: Int?,
    onNextQuestion: () -> Unit,
    onShowQuizResult: () -> Unit,
    onSelectOption: (Int) -> Unit,
    onNavigateBack: () -> Unit = {}

) {

    val drawableOption1Id = when (selectedOptionId) {
        1 -> if (selectedOptionId == question.correctOptionId) {
            R.drawable.q_opt_1_right
        } else {
            R.drawable.q_opt_1_wrong
        }

        else -> R.drawable.quiz_opt_1
    }

    val drawableOption2Id = when (selectedOptionId) {
        2 -> if (selectedOptionId == question.correctOptionId) {
            R.drawable.q_opt_2_right
        } else {
            R.drawable.q_opt_2_wrong
        }

        else -> R.drawable.quiz_opt_2
    }

    val drawableOption3Id = when (selectedOptionId) {
        3 -> if (selectedOptionId == question.correctOptionId) {
            R.drawable.q_opt_3_right
        } else {
            R.drawable.q_opt_3_wrong
        }

        else -> R.drawable.quiz_opt_3
    }

    val drawableOption4Id = when (selectedOptionId) {
        4 -> if (selectedOptionId == question.correctOptionId) {
            R.drawable.q_opt_2_right
        } else {
            R.drawable.q_opt_2_wrong
        }

        else -> R.drawable.quiz_opt_2
    }

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
            text = question.title,
            style = TextStyle(
                color = Color6,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
            )
        )

        Spacer(modifier = Modifier.height(75.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight(),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier
                    .scale(2.8f)
                    .clickable {
                        onSelectOption(1)
                    },
                painter = painterResource(
                    id = drawableOption1Id
                ),
                contentDescription = "opt_1"
            )

            if (selectedOptionId == question.correctOptionId && selectedOptionId == 1) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_right_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }

            if (selectedOptionId != question.correctOptionId && selectedOptionId == 1) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_wrong_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }




            Text(
                text = question.option1.text,
                style = TextStyle(
                    color = Color6,
                    fontFamily = openSansFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    textAlign = TextAlign.Center
                )
            )
        }

        Spacer(modifier = Modifier.height(75.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight(),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier
                    .scale(2.8f)
                    .clickable {
                        onSelectOption(2)
                    },
                painter = painterResource(id = drawableOption2Id),
                contentDescription = "opt_2"
            )

            if (selectedOptionId == question.correctOptionId && selectedOptionId == 2) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_right_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }

            if (selectedOptionId != question.correctOptionId && selectedOptionId == 2) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_wrong_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }
            Text(
                text = question.option2.text,
                style = TextStyle(
                    color = Color6,
                    fontFamily = openSansFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    textAlign = TextAlign.Center
                )
            )
        }

        Spacer(modifier = Modifier.height(75.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight(),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier
                    .scale(2.8f)
                    .clickable {
                        onSelectOption(3)
                    },
                painter = painterResource(id = drawableOption3Id),
                contentDescription = "opt_3"
            )

            if (selectedOptionId == question.correctOptionId && selectedOptionId == 3) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_right_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }

            if (selectedOptionId != question.correctOptionId && selectedOptionId == 3) {
                Icon(
                    modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                    painter = painterResource(id = R.drawable.ans_wrong_icon),
                    contentDescription = "ans_right",
                    tint = Color.Unspecified
                )
            }

            Text(
                text = question.option3.text,
                style = TextStyle(
                    color = Color6,
                    fontFamily = openSansFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    textAlign = TextAlign.Center
                )
            )
        }


        if (question.option4 != null) {
            Spacer(modifier = Modifier.height(75.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .wrapContentHeight(),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    modifier = Modifier
                        .scale(2.8f)
                        .clickable {
                            onSelectOption(4)
                        },
                    painter = painterResource(id = drawableOption4Id),
                    contentDescription = "opt_4"
                )

                if (selectedOptionId == question.correctOptionId && selectedOptionId == 4) {
                    Icon(
                        modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                        painter = painterResource(id = R.drawable.ans_right_icon),
                        contentDescription = "ans_right",
                        tint = Color.Unspecified
                    )
                }

                if (selectedOptionId != question.correctOptionId && selectedOptionId == 4) {
                    Icon(
                        modifier = Modifier.align(Alignment.TopEnd).offset(y = -20.dp).scale(2f),
                        painter = painterResource(id = R.drawable.ans_wrong_icon),
                        contentDescription = "ans_right",
                        tint = Color.Unspecified
                    )
                }

                Text(
                    text = question.option4.text,
                    style = TextStyle(
                        color = Color6,
                        fontFamily = openSansFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(50.dp))

        if (question.id + 1 > questionnaire.last().id) {
            Button(
                modifier = Modifier
                    .align(Alignment.End),
                onClick = onShowQuizResult,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    text = "Show Result",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 24.sp,
                        fontFamily = puddleFontFamily,
                        lineHeight = 21.79.sp,
                        textAlign = TextAlign.Center
                    )
                )
            }
        } else {
            Button(
                modifier = Modifier
                    .align(Alignment.End),
                onClick = onNextQuestion,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    text = "Next Question",
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
}