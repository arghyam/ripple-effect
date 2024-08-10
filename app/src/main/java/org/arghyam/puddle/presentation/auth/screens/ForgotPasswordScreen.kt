package org.arghyam.puddle.presentation.auth.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
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
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.auth.ForgotPasswordViewModel
import org.arghyam.puddle.presentation.auth.events.ForgotPasswordEvent
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Composable
fun ForgotPasswordScreen(
    forgotPasswordViewModel: ForgotPasswordViewModel,
    onNavigate: (String) -> Unit = {}
) {

    val forgotPasswordState = forgotPasswordViewModel.forgotPasswordState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxWidth()
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
            text = "Email",
            style = TextStyle(
                color = MaterialTheme.colorScheme.onTertiary,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        TextField(
            value = forgotPasswordState.value.email,
            onValueChange = {
                forgotPasswordViewModel.onEvent(ForgotPasswordEvent.OnEmailChanged(it))
            },

            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
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


        Spacer(modifier = Modifier.height(20.dp))


        Button(
            modifier = Modifier
                .fillMaxWidth(),
            onClick = {
                forgotPasswordViewModel.onEvent(ForgotPasswordEvent.OnSendEmail)
            },
            shape = RoundedCornerShape(15.dp),
            contentPadding = PaddingValues(vertical = 11.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0XFFEEF9BF),
                contentColor = Color(0XFF216869)
            )
        ) {
            Text(
                text = "Send an Otp",
                fontWeight = FontWeight.ExtraBold,
                fontStyle = FontStyle.Normal,
                fontFamily = puddleFontFamily,
                fontSize = 16.sp,
                lineHeight = 21.79.sp,
            )
        }

    }
}