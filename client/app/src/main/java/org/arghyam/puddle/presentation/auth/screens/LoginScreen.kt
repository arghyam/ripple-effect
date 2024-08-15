package org.arghyam.puddle.presentation.auth.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.auth.LoginViewModel
import org.arghyam.puddle.presentation.auth.events.AuthUiEvent
import org.arghyam.puddle.presentation.auth.events.LoginEvent
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import kotlinx.coroutines.flow.collectLatest


@Composable
fun LoginScreen(
    onNavigate: (String) -> Unit,
    authViewModel: LoginViewModel
) {


    var isPasswordVisible by remember {
        mutableStateOf(false)
    }
    val context = LocalContext.current

    val loginState = authViewModel.loginState.collectAsState()
    val signInResState = authViewModel.signInResponse.collectAsState()

    LaunchedEffect(key1 = true) {
        authViewModel.eventFlow.collectLatest { event ->
            when (event) {

                is AuthUiEvent.LoginUserSuccessful -> {
                    onNavigate(Routes.AppGraph.route)
                }

                is AuthUiEvent.LoginUserFailed -> {

                }

                else -> Unit
            }
        }
    }


    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 30.dp)
    ) {

        Spacer(modifier = Modifier.height(50.dp))

        Text(
            text = "Login",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(10.dp))

        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
            //verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {

            Image(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(380.dp)
                    .clip(RoundedCornerShape(15.dp)),
                painter = painterResource(id = R.drawable.img),
                contentDescription = "logo",
                contentScale = ContentScale.Fit
            )

            Spacer(modifier = Modifier.height(0.dp))

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

            TextField(
                value = loginState.value.email,
                onValueChange = {
                    authViewModel.onEvent(LoginEvent.OnEmailChanged(it))
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
                text = "Password",
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
                value = loginState.value.password,
                onValueChange = {
                    authViewModel.onEvent(LoginEvent.OnPasswordChanged(it))
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
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                keyboardActions = KeyboardActions(
                    onNext = {
                        // Your custom logic to handle "Next" action on the first field
                        // Request focus for the next field
                    }
                ),
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
                horizontalArrangement = Arrangement.spacedBy(40.dp)
            ) {
                TextButton(
                    //modifier = Modifier.weight(1f),
                    onClick = {
                        onNavigate(Routes.ForgotPassword.route)
                    }
                ) {
                    Text(
                        text = "Forgot\nPassword?",
                        style = TextStyle(
                            color = MaterialTheme.colorScheme.onTertiary,
                            fontWeight = FontWeight.Normal,
                            fontStyle = FontStyle.Italic,
                            fontSize = 16.sp,
                            lineHeight = 21.79.sp,
                        )
                    )
                }

                Button(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    onClick = {
                        authViewModel.onEvent(LoginEvent.OnLoginClicked)
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0XFFEEF9BF),
                        contentColor = Color(0xFF216869)
                    ),
                    shape = RoundedCornerShape(15.dp)
                ) {
                    Text(
                        modifier = Modifier.fillMaxWidth(),
                        text = "Login",
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

                    text = "Don't have an account?",
                    style = TextStyle(
                        color = MaterialTheme.colorScheme.onTertiary,
                        fontSize = 16.sp,
                        fontFamily = openSansFontFamily
                    )

                )
                Text(
                    modifier = Modifier.clickable {
                        onNavigate(Routes.Register.route)
                    },
                    text = " Register",
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

    if (signInResState.value.isLoading) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(color = Color.Gray.copy(alpha = 0.6f)),
            contentAlignment = Alignment.Center
        ) {
            //CircularProgressIndicator(modifier = Modifier.fillMaxWidth(0.8f))

            Text(text = "Logging in...", color = Color.White, fontSize = 20.sp)
        }
    }


}