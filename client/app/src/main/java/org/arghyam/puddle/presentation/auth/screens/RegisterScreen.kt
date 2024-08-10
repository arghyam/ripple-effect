package org.arghyam.puddle.presentation.auth.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.auth.RegisterViewModel
import org.arghyam.puddle.presentation.auth.events.RegisterEvent
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily


@Composable
fun RegisterScreen(
    registerViewModel: RegisterViewModel,
    onNavigate: (String) -> Unit = {}
) {

    val registerState = registerViewModel.registerState.collectAsState()

    val signUpRes =  registerViewModel.signUpResponse.collectAsState()

    var isPasswordVisible by remember {
        mutableStateOf(false)
    }

    var isConfirmPasswordVisible by remember {
        mutableStateOf(false)
    }

    LaunchedEffect(key1 = signUpRes.value.isSignupSuccessful) {
       if (signUpRes.value.isSignupSuccessful == true) {
           onNavigate(Routes.Login.route)
       }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            //.background(color = Color.White)
            .padding(horizontal = 30.dp)
    ) {

        Spacer(modifier = Modifier.height(50.dp))

        Text(
            text = "Create Account",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        Image(
            modifier = Modifier
                .fillMaxWidth()
                .height(203.dp),
            painter = painterResource(id = R.drawable.img_1),
            contentDescription = "logo",
            contentScale = ContentScale.Fit
        )
        Spacer(modifier = Modifier.height(10.dp))

        Text(
            modifier = Modifier.align(Alignment.Start),
            text = "Enter your name*",
            style = TextStyle(
                color = MaterialTheme.colorScheme.onTertiary,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )

        TextField(
            value = registerState.value.name,
            onValueChange = {
                registerViewModel.onEvent(RegisterEvent.OnNameChanged(it))
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

        Spacer(modifier = Modifier.height(10.dp))


        Text(
            modifier = Modifier.align(Alignment.Start),
            text = "Email*",
            style = TextStyle(
                color = MaterialTheme.colorScheme.onTertiary,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )


        TextField(
            value = registerState.value.email,
            onValueChange = {
                registerViewModel.onEvent(RegisterEvent.OnEmailChanged(it))
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

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            modifier = Modifier.align(Alignment.Start),
            text = "Enter password*",
            style = TextStyle(
                color = MaterialTheme.colorScheme.onTertiary,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )


        TextField(
            value = registerState.value.password,
            onValueChange = {
                registerViewModel.onEvent(RegisterEvent.OnPasswordChanged(it))
            },

            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),
            visualTransformation = if (isPasswordVisible) {
                VisualTransformation.None
            } else {
                PasswordVisualTransformation()
            },
            trailingIcon = {

                IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
                    Icon(
                        painter = if (isPasswordVisible) {
                            painterResource(id = R.drawable.baseline_visibility_off_24)
                        } else {
                            painterResource(id = R.drawable.baseline_visibility_24)
                        },
                        contentDescription = "visibility_icon",
                        tint = Color(0XFFEEF9BF)
                    )
                }

            },
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

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            modifier = Modifier.align(Alignment.Start),
            text = "Confirm password*",
            style = TextStyle(
                color = MaterialTheme.colorScheme.onTertiary,
                fontSize = 16.sp,
                fontFamily = openSansFontFamily,
                fontWeight = FontWeight.Bold,
                lineHeight = 21.79.sp
                //textAlign = TextAlign.Start
            )
        )


        TextField(
            value = registerState.value.confirmPassword,
            onValueChange = {
                registerViewModel.onEvent(RegisterEvent.OnConfirmPasswordChanged(it))
            },

            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),
            visualTransformation = if (isConfirmPasswordVisible) {
                VisualTransformation.None
            } else {
                PasswordVisualTransformation()
            },
            trailingIcon = {

                IconButton(onClick = { isConfirmPasswordVisible = !isConfirmPasswordVisible }) {
                    Icon(
                        painter = if (isConfirmPasswordVisible) {
                            painterResource(id = R.drawable.baseline_visibility_off_24)
                        } else {
                            painterResource(id = R.drawable.baseline_visibility_24)
                        },
                        contentDescription = "visibility_icon",
                        tint = Color(0XFFEEF9BF)
                    )
                }

            },
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

        Spacer(modifier = Modifier.height(23.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.End
        ) {

            Button(
                modifier = Modifier
                    .fillMaxWidth()
                ,
                onClick = {
                    registerViewModel.onEvent(RegisterEvent.OnSignUp)
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    modifier = Modifier.fillMaxWidth(),
                    text = "Sign Up",
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

        Spacer(modifier = Modifier.height(23.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Text(

                text = "Already have an account?",
                style = TextStyle(
                    color = MaterialTheme.colorScheme.onTertiary,
                    fontSize = 16.sp,
                    fontFamily = openSansFontFamily

                )

                )
            Text(
                modifier = Modifier.clickable {
                    onNavigate(Routes.Login.route)
                },
                text = " Login",
                style = TextStyle(
                    color = MaterialTheme.colorScheme.onTertiary,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    fontFamily = openSansFontFamily
                )
                )

        }

    }

}