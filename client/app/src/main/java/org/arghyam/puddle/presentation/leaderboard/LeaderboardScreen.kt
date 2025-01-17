package org.arghyam.puddle.presentation.leaderboard

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import org.arghyam.puddle.R
import org.arghyam.puddle.presentation.leaderboard.events.LeaderboardEvent
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.koin.androidx.compose.navigation.koinNavViewModel

@Preview
@Composable
fun LeaderboardScreen(

    leaderboardViewModel: LeaderboardViewModel = koinNavViewModel()

) {

    val leaderboardLayoutState by leaderboardViewModel.leaderboardLayoutState.collectAsState()

    LaunchedEffect(true) {

        leaderboardViewModel.onEvent(LeaderboardEvent.FetchLeaderboard)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp)
    ) {

        Text(
            text = "Leaderboard",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(80.dp))

        LeaderboardLayout(
            modifier = Modifier.align(Alignment.CenterHorizontally).padding(horizontal = 50.dp),
            userId = "1ef5b01f-008f-6af0-aae7-781b2b58beb0",
            leaderboardRanks = leaderboardLayoutState.topFiveRanks
        ) {

            Log.d("LeaderboardScreen", "${leaderboardLayoutState.topFiveRanks}")
            leaderboardLayoutState.topFiveRanks.forEach { rankState ->

                Box(
                    modifier = Modifier.layoutId(rankState.rank),
                    contentAlignment = Alignment.Center
                ) {

                    AsyncImage(
                        modifier = Modifier
                            .scale(2.8f)
                            ,
                        model = if (rankState.userId == "1ef5b01f-008f-6af0-aae7-781b2b58beb0") rankState.selectedBgImage else rankState.bgImage,
                        contentDescription = rankState.name + "image",
                    )


                    Column(
                        modifier = Modifier.offset(x  = if (rankState.rank == 2) -10.dp else 0.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = rankState.name.split(" ")[0],
                            style = TextStyle(
                                textAlign = TextAlign.Center,
                                color = Color.White,
                                fontFamily = openSansFontFamily,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp,
                            )
                        )
                        Text(
                            text = "${rankState.waterFootprint} liters",
                            style = TextStyle(
                                textAlign = TextAlign.Center,
                                color = Color.White,
                                fontFamily = openSansFontFamily,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp,
                            )
                        )
                    }



                }
            }

        }

        Spacer(modifier = Modifier.height(50.dp))

        HorizontalDivider(
            thickness = 2.dp,
            color = Color.White.copy(0.6f)
        )
        Spacer(modifier = Modifier.height(50.dp))

        Row(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(80.dp)
        ) {
            Text(
                text = "Your\nRank",
                style = TextStyle(
                    fontWeight = FontWeight.ExtraBold,
                    textAlign = TextAlign.Center,
                    fontFamily = puddleFontFamily,
                    fontSize = 32.sp,
                    color = MaterialTheme.colorScheme.primary,
                    lineHeight = 35.2.sp
                )
            )

            Box(
                contentAlignment = Alignment.Center
            ) {



                AsyncImage(
                    modifier = Modifier
                        .scale(2.8f)
                    ,
                    model = R.drawable.mrank_bg,
                    contentDescription = "mrank" + "image",
                )

                Text(
                    modifier = Modifier.align(Alignment.TopCenter).offset(y = -30.dp),
                    text = "${leaderboardLayoutState.mRank.rank}",
                    style = TextStyle(
                        color = Color.White,
                        fontFamily = openSansFontFamily,
                        fontWeight = FontWeight.ExtraBold,
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp
                    )
                )


                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = leaderboardLayoutState.mRank.name.split(" ")[0],
                        style = TextStyle(
                            textAlign = TextAlign.Center,
                            color = Color.White,
                            fontFamily = openSansFontFamily,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                        )
                    )
                    Text(
                        text = "${leaderboardLayoutState.mRank.waterFootprint} liters",
                        style = TextStyle(
                            textAlign = TextAlign.Center,
                            color = Color.White,
                            fontFamily = openSansFontFamily,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                        )
                    )
                }



            }
        }

    }

}