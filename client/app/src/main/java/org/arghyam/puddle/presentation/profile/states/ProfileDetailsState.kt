package org.arghyam.puddle.presentation.profile.states

import android.net.Uri

data class ProfileDetailsState(
    val name: String = "",
    val email: String = "",
    val phoneNumber: String = "",
    val waterFootprint: Int = 0,
    val photoUri: Uri = Uri.EMPTY
)
