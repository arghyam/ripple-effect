package org.arghyam.puddle.presentation.profile

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import coil.compose.AsyncImage
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.profile.states.ProfileDetailsState
import org.arghyam.puddle.ui.theme.Color5

@Composable
fun EditProfileDialog(
    profileDetailsState: ProfileDetailsState,
    onDismiss: () -> Unit,
    onSaveProfileData: (ProfileDetailsState) -> Unit,
) {


    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(
            dismissOnBackPress = false,
            dismissOnClickOutside = false
        )
    ) {

        EditProfileDialogContent(
            profileDetailsState = profileDetailsState,
            onCancel = onDismiss,
            onSave = onSaveProfileData
        )

    }

}


@Composable
fun EditProfileDialogContent(
    profileDetailsState: ProfileDetailsState,
    onCancel: () -> Unit,
    onSave: (ProfileDetailsState) -> Unit
) {

    var profileName by remember {
        mutableStateOf(profileDetailsState.name)
    }

    var profileEmail by remember {
        mutableStateOf(profileDetailsState.email)
    }

    var profilePhoneNumber by remember {
        mutableStateOf(profileDetailsState.phoneNumber)
    }

    var profilePhotoUri by remember {
        mutableStateOf<Uri?>(profileDetailsState.photoUri)
    }
    val galleryLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        if (uri != null) {
            profilePhotoUri = uri
        }
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(15.dp))
            .background(Color5)
            .padding(20.dp)
        ,
    ) {

        Box(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            AsyncImage(
                modifier = Modifier
                    .size(180.dp)
                    .clip(CircleShape)
                    .border(1.dp, Color.Black.copy(0.6f), CircleShape)
                ,
                model = profilePhotoUri,
                contentScale = ContentScale.Crop,
                contentDescription = "image"
            )

            IconButton(
                onClick = {
                    galleryLauncher.launch("image/*")
                },
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .background(
                        color = Color.Blue,
                        shape = CircleShape
                    )
                    .padding(4.dp)
                    .size(40.dp)
            ) {
                Icon(
                    modifier = Modifier.scale(3f),
                    painter = painterResource(R.drawable.edit_profile),
                    contentDescription = null,
                    tint = Color.White
                )
            }
            
        }


        Text(
            text = "Name"
        )

        Spacer(Modifier.height(5.dp))

        TextField(
            value = profileName,
            onValueChange = {
                profileName = it
            },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),


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

        Spacer(Modifier.height(10.dp))

        Text(
            text = "Email"
        )

        Spacer(Modifier.height(5.dp))

        TextField(
            value = profileEmail,
            onValueChange = {
                profileEmail = it
            },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),


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

        Spacer(Modifier.height(10.dp))

        Text(
            text = "Phone Number"
        )

        Spacer(Modifier.height(5.dp))

        TextField(
            value = profilePhoneNumber,
            onValueChange = {
                profilePhoneNumber = it
            },
            singleLine = true,
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp)),


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

        Spacer(Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Button(
                onClick = onCancel,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Red,
                    contentColor = Color.White
                )
            ) {
                Text(
                    text = "Cancel"
                )
            }

            Button(
                onClick = { onSave(
                    ProfileDetailsState(
                        name = profileName,
                        email = profileEmail,
                        photoUri = profilePhotoUri?: profileDetailsState.photoUri,
                        phoneNumber = profilePhoneNumber
                    )
                ) },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Green,
                    contentColor = Color.White
                )
            ) {
                Text(
                    text = "Save"
                )
            }
        }

    }
}