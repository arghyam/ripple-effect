package org.arghyam.puddle.presentation.profile

import android.net.Uri
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.domain.repository.UserRepository
import org.arghyam.puddle.domain.utils.handleResult
import org.arghyam.puddle.presentation.profile.events.ProfileEvent
import org.arghyam.puddle.presentation.profile.states.ProfileDetailsState
import org.arghyam.puddle.presentation.profile.states.UserWftProgressState
import org.arghyam.puddle.utils.fileFromContentUri

class ProfileViewModel(
    private val userRepo: UserRepository
): ViewModel() {

    private val _profileDetailsState = MutableStateFlow(ProfileDetailsState())
    val profileDetailsState: StateFlow<ProfileDetailsState> = _profileDetailsState.asStateFlow()

    private val _userWftProgressState = MutableStateFlow(UserWftProgressState())
    val userWftProgressState: StateFlow<UserWftProgressState> = _userWftProgressState.asStateFlow()

    fun onEvent(event: ProfileEvent) {

        when(event) {
            is ProfileEvent.FetchProfileDetails -> {
                viewModelScope.launch {
                    userRepo.fetchProfile(
                        userId = "1ef5b01f-008f-6af0-aae7-781b2b58beb0",
                    ).handleResult(
                        onSuccess = { profile ->
                            Log.d("ProfileViewModel", "${Uri.parse(BuildConfig.SERVER_URL + '/' + profile?.photo_url)}")
                            if (profile != null) {

                                val uri = Uri.parse(BuildConfig.SERVER_URL + '/' + profile.photo_url)
                                _profileDetailsState.update {
                                    it.copy(
                                        name = profile.name,
                                        email = profile.email,
                                        phoneNumber = profile.phone_number?: "",
                                        waterFootprint = profile.water_footprint,
                                        photoUri = uri
                                    )
                                }
                            }
                        }
                    )
                }
            }

            is ProfileEvent.FetchUserWftProgress -> {
                _userWftProgressState.update {
                    it.copy(isLoading = true)
                }

                viewModelScope.launch {
                    userRepo.getUserWftProgress(
                        userId = "1ef5b01f-008f-6af0-aae7-781b2b58beb0",
                        queryType = "week"
                    ).handleResult(
                        onSuccess = { dayWfts ->

                            if (!dayWfts.isNullOrEmpty()) {
                                _userWftProgressState.update {
                                    it.copy(isLoading = false, data = dayWfts)
                                }
                            } else {
                                _userWftProgressState.update {
                                    it.copy(isLoading = false)
                                }
                            }

                        },
                        onError = {
                            _userWftProgressState.update {
                                it.copy(isLoading = false)
                            }
                        }
                    )
                }
            }
            is ProfileEvent.ChangeProfileDetails -> {

                viewModelScope.launch {
                    userRepo.updateProfileData(
                        userId = "1ef5b01f-008f-6af0-aae7-781b2b58beb0",
                        name = event.profileDetailsState.name,
                        email = event.profileDetailsState.email,
                        phoneNumber = event.profileDetailsState.phoneNumber,
                        photoFile = fileFromContentUri(event.context, event.profileDetailsState.photoUri)
                    ).handleResult(
                        onSuccess = {
                            if (it == true) {
                                _profileDetailsState.update { state ->
                                    state.copy(
                                        name = event.profileDetailsState.name,
                                        email = event.profileDetailsState.email,
                                        phoneNumber = event.profileDetailsState.phoneNumber,
                                        photoUri = Uri.parse(event.profileDetailsState.phoneNumber)
                                    )
                                }
                            }
                        }
                    )
                }

            }

            else -> Unit
        }
    }

}