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
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.auth.events.ForgotPasswordEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.koin.androidx.compose.koinViewModel

@Preview
@Composable
fun ResetPasswordScreen(
    forgotPwdViewModel: ForgotPasswordViewModel = koinViewModel(),
    onNavigate: (String) -> Unit = {}
) {

    val forgotPasswordState = forgotPwdViewModel.forgotPasswordState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {

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

        Text(
            modifier = Modifier.align(Alignment.Start),
            text = "New Password",
            style = TextStyle(
                color = Color.White,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        TextField(
            value = forgotPasswordState.value.newPassword,
            onValueChange = {
                forgotPwdViewModel.onEvent(ForgotPasswordEvent.OnNewPasswordChanged(it))
            },

            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
            colors = TextFieldDefaults.colors(
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
                unfocusedContainerColor = Color3,
                focusedContainerColor = MaterialTheme.colorScheme.tertiary,
                focusedTextColor = MaterialTheme.colorScheme.onPrimary,
                unfocusedTextColor = MaterialTheme.colorScheme.onPrimary,
                cursorColor = MaterialTheme.colorScheme.onPrimary
            )

        )

        Spacer(modifier = Modifier.height(20.dp))



        Button(
            modifier = Modifier
                .fillMaxWidth(),
            onClick = {
                forgotPwdViewModel.onEvent(ForgotPasswordEvent.OnResetPassword)
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0XFF216869)
            )
        ) {
            Text(
                text = "Reset Password",
                style = TextStyle(
                    fontSize = 20.sp
                )
            )
        }

    }
}