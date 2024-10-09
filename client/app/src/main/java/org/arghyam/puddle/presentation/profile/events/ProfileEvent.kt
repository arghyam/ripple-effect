package org.arghyam.puddle.presentation.profile.events

import android.content.Context
import android.net.Uri
import org.arghyam.puddle.presentation.profile.states.ProfileDetailsState

sealed interface ProfileEvent {

    data object FetchProfileDetails: ProfileEvent

    data object FetchUserWftProgress: ProfileEvent


    data class ChangeProfileDetails(
        val context: Context,
        val profileDetailsState: ProfileDetailsState
    ): ProfileEvent


}