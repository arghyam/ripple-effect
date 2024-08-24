package org.arghyam.puddle.presentation.auth.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.auth.events.ForgotPasswordEvent
import org.arghyam.puddle.ui.theme.Color1
import org.koin.androidx.compose.koinViewModel


@Preview
@Composable
fun VerifyOTPScreen(
    forgotPwdViewModel: ForgotPasswordViewModel = koinViewModel(),
    onNavigate: (String) -> Unit = {}
) {

    val forgotPwdState = forgotPwdViewModel.forgotPasswordState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 10.dp)
    ){

        Image(
            modifier = Modifier
                .fillMaxWidth()
                .height(380.dp)
                .padding(top = 30.dp)
                .clip(RoundedCornerShape(15.dp)),
            painter = painterResource(id = R.drawable.img),
            contentDescription = "logo",
            contentScale = ContentScale.Fit
        )

        Spacer(modifier = Modifier.height(10.dp))

        TextField(
            modifier = Modifier.fillMaxWidth(),
            value = forgotPwdState.value.otp,
            onValueChange = {
                forgotPwdViewModel.onEvent(ForgotPasswordEvent.OnForgotPwdOtpChanged(it))
            },
            colors = TextFieldDefaults.colors(
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
                unfocusedContainerColor = MaterialTheme.colorScheme.tertiary,
                focusedContainerColor = MaterialTheme.colorScheme.tertiary,
                focusedTextColor = MaterialTheme.colorScheme.onPrimary,
                unfocusedTextColor = MaterialTheme.colorScheme.onPrimary,
                cursorColor = MaterialTheme.colorScheme.onPrimary
            )
        )


        Spacer(modifier = Modifier.height(10.dp))

        Button(
            modifier = Modifier
                .fillMaxWidth(),
            onClick = {
                forgotPwdViewModel.onEvent(ForgotPasswordEvent.OnVerifyForgotPwdOtp)
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0XFF216869)
            )
        ) {
            Text(
                text = "Verify Otp",
                fontWeight = FontWeight.Bold,
                fontStyle = FontStyle.Normal,
                fontSize = 16.sp,
                lineHeight = 21.79.sp,
            )
        }


    }
}