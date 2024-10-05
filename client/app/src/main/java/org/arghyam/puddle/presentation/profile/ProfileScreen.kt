package org.arghyam.puddle.presentation.profile

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
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
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import org.arghyam.puddle.BuildConfig
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.profile.events.ProfileEvent
import org.arghyam.puddle.presentation.profile.states.ProfileDetailsState
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color4
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.Color6
import org.arghyam.puddle.ui.theme.graphLineColor
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.arghyam.puddle.utils.LineChart
import org.arghyam.puddle.utils.chartUtils.models.DividerProperties
import org.arghyam.puddle.utils.chartUtils.models.DotProperties
import org.arghyam.puddle.utils.chartUtils.models.DrawStyle
import org.arghyam.puddle.utils.chartUtils.models.GridProperties
import org.arghyam.puddle.utils.chartUtils.models.HorizontalIndicatorProperties
import org.arghyam.puddle.utils.chartUtils.models.IndicatorPosition
import org.arghyam.puddle.utils.chartUtils.models.LabelHelperProperties
import org.arghyam.puddle.utils.chartUtils.models.LabelProperties
import org.arghyam.puddle.utils.chartUtils.models.Line
import org.arghyam.puddle.utils.chartUtils.models.LineProperties
import org.arghyam.puddle.utils.chartUtils.models.StrokeStyle
import org.koin.androidx.compose.navigation.koinNavViewModel

@Preview
@Composable
fun ProfileScreen(
    onNavigateBack: () -> Unit = {},
    onNavigate: (String) -> Unit = {},
    profileViewModel: ProfileViewModel = koinNavViewModel()

) {

    val context = LocalContext.current
    val profileDetailsState by profileViewModel.profileDetailsState.collectAsState()
    val userWftProgressState by profileViewModel.userWftProgressState.collectAsState()

    var isEditProfileDialogOpened by remember {
        mutableStateOf(false)
    }

    LaunchedEffect(true) {
        profileViewModel.onEvent(ProfileEvent.FetchProfileDetails)
        profileViewModel.onEvent(ProfileEvent.FetchUserWftProgress)
    }

    if(isEditProfileDialogOpened) {
        EditProfileDialog(
            onDismiss = {
                isEditProfileDialogOpened = false
            },
            profileDetailsState = profileDetailsState,
            onSaveProfileData = {
                profileViewModel.onEvent(ProfileEvent.ChangeProfileDetails(
                    context,
                    it
                ))
                isEditProfileDialogOpened = false
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {

        Text(
            text = "Hello ${profileDetailsState.name}!",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(50.dp))

        Box(
            modifier = Modifier.fillMaxWidth()
        ) {
            Image(
                modifier = Modifier
                    .align(Alignment.Center)
                    .scale(2.9f),
                painter = painterResource(R.drawable.profile_header_bg),
                contentDescription = "profile header"
            )

            Row(
                modifier = Modifier
                    .align(Alignment.CenterStart),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                AsyncImage(
                    modifier = Modifier
                        .size(65.dp)
                        .clip(RoundedCornerShape(50))
                    ,
                    model = profileDetailsState.photoUri,
                    contentScale = ContentScale.Crop,
                    contentDescription = "profile_photo"
                )

                Column {
                    Text(
                        text = profileDetailsState.email,
                        style = TextStyle(
                            fontWeight = FontWeight.Normal,
                            fontFamily = openSansFontFamily,
                            fontSize = 15.sp,
                            color = Color6,
                        )
                    )
                    Text(
                        text = profileDetailsState.phoneNumber,
                        style = TextStyle(
                            fontWeight = FontWeight.Normal,
                            fontFamily = openSansFontFamily,
                            fontSize = 15.sp,
                            color = Color6,
                        )
                    )
                }
            }

            IconButton(
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .offset(x = 0.dp, y = (-5).dp),
                onClick = {
                    isEditProfileDialogOpened = true
                }
            ) {
                Icon(
                    modifier = Modifier.scale(2.5f),
                    painter = painterResource(R.drawable.edit_profile),
                    contentDescription = "icon_edit_profile",
                    tint = Color.White
                )
            }
        }

        Spacer(Modifier.height(60.dp))

        Box(
            modifier = Modifier
                .align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier
                    .scale(2.5f),
                painter = painterResource(R.drawable.total_wft_bg),
                contentDescription = "total_eft_bg_in_profile"
            )

            Text(
                text = "${profileDetailsState.waterFootprint}\nliters",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily,
                    fontSize = 22.sp,
                    color = Color6,
                    textAlign = TextAlign.Center
                )
            )
        }

        Spacer(Modifier.height(20.dp))

        Row(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Latest diet water footprint",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily,
                    fontSize = 16.sp,
                    color = Color6,
                )
            )
            IconButton(
                onClick = {}
            ) {
                Icon(
                    modifier = Modifier.scale(2.5f),
                    painter = painterResource(R.drawable.share_icon),
                    contentDescription = "share_icon",
                    tint = Color.White
                )
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(5.dp)
        ) {
            Button(
                modifier = Modifier,
                onClick = {
                    onNavigate(Routes.CalculateScreen.route)
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    text = "Calculate Now",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp,
                        fontFamily = puddleFontFamily,
                        textAlign = TextAlign.Center
                    )
                )
            }
            Button(
                modifier = Modifier,
                onClick = {
                    onNavigate(Routes.LeaderboardScreen.route)
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    text = "Leaderboard",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp,
                        fontFamily = puddleFontFamily,
                        textAlign = TextAlign.Center
                    )
                )
            }
        }

        Spacer(Modifier.height(10.dp))

        Text(
            text = "Track Progress",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 24.sp,
                color = Color(0XFFEEF9BF),
            )
        )
        Spacer(Modifier.height(10.dp))


        val labels = userWftProgressState.data.map {
            it.dayName
        }
        val wfts = userWftProgressState.data.map {
            it.water_footprint.toDouble()
        }

        if (userWftProgressState.data.isNotEmpty()) {
            LineChart(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(250.dp),
                data = listOf(
                    Line(
                        label = "User Wft Progress",
                        values = wfts,
                        color = SolidColor(Color4),
                        drawStyle = DrawStyle.Stroke(1.dp),
                        curvedEdges = false,
                        dotProperties = DotProperties(
                            enabled = true,
                            color = SolidColor(Color.White),
                            strokeWidth = 4.dp,
                            radius = 7.dp
                        )
                    )
                ),
                dividerProperties = DividerProperties(
                    enabled = true,
                    yAxisProperties = LineProperties(
                        color = SolidColor(Color6),
                        thickness = 1.dp
                    ),
                    xAxisProperties = LineProperties(
                        color = SolidColor(Color6),
                        thickness = 1.dp
                    )
                ),
                gridProperties = GridProperties(
                    enabled = true,
                    yAxisProperties = GridProperties.AxisProperties(
                        enabled = true,
                        style = StrokeStyle.Dashed(intervals = floatArrayOf(10f, 10f)),
                        color = SolidColor(graphLineColor),
                        thickness = (1).dp,
                        lineCount = 7
                    ),
                    xAxisProperties = GridProperties.AxisProperties(
                        enabled = true,
                        style = StrokeStyle.Dashed(intervals = floatArrayOf(10f, 10f)),
                        color = SolidColor(graphLineColor),
                        thickness = (1).dp,
                        lineCount = 7
                    )
                ),
                labelProperties = LabelProperties(
                    enabled = true,
                    textStyle = TextStyle(
                        fontWeight = FontWeight.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color5,
                        fontSize = 13.sp
                    ),
                    padding = 10.dp,
                    labels = labels
                ),
                labelHelperProperties = LabelHelperProperties(
                    enabled = false
                ),
                indicatorProperties = HorizontalIndicatorProperties(
                    enabled = true,
                    textStyle = TextStyle(
                        fontWeight = FontWeight.Normal,
                        fontFamily = openSansFontFamily,
                        color = Color5,
                        fontSize = 10.sp
                    ),
                    count = 7,
                    position = IndicatorPosition.Horizontal.Start,
                    padding = 10.dp,
                    contentBuilder = { indicator ->
                        indicator.toInt().toString()
                    }
                )

            )
        }


    }

}