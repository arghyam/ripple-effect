package org.arghyam.puddle.presentation.dashboard

import android.graphics.Bitmap
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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.presentation.dashboard.utils.WFTProgressImageView
import org.arghyam.puddle.presentation.dashboard.utils.saveBitmapToFile
import org.arghyam.puddle.presentation.dashboard.utils.shareImageOnWhatsApp
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.Color6
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import org.koin.androidx.compose.navigation.koinNavViewModel

@Composable
fun DashboardScreen(
    viewModel: DashboardViewModel = koinNavViewModel(),
    onNavigate: (String) -> Unit = {}
) {


    val wftProgress by viewModel.mWftProgress.collectAsState()
    val context = LocalContext.current

    var scope = rememberCoroutineScope()



    var bitmap = remember {
        mutableStateOf<Bitmap?>(null)
    }



    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(start = 20.dp, end = 20.dp, top = 10.dp)
    ) {

        Text(
            text = "Hi Keval!",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = Color5,
                lineHeight = 35.2.sp
            )
        )

        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                modifier = Modifier
                ,
                text = "Your daily diet water footprint",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = puddleFontFamily,
                    fontSize = 18.sp,
                    color = Color6,
                )
            )

            Text(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color5)
                    .padding(5.dp)

                ,
                text = "500 L",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = puddleFontFamily,
                    fontSize = 18.sp,
                    color = Color3,
                )
            )
        }

        Spacer(modifier = Modifier.height(80.dp))

        Box(
            modifier = Modifier
                .align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier
                    .scale(3f),
                painter = painterResource(R.drawable.total_wft_bg),
                contentDescription = "total_eft_bg_in_profile"
            )

            Text(
                text = "5000\nliters",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily,
                    fontSize = 22.sp,
                    color = Color6,
                    textAlign = TextAlign.Center
                )
            )
        }

        Spacer(Modifier.height(50.dp))

        Text(
            modifier = Modifier
                .align(Alignment.CenterHorizontally),
            text = "Latest diet water footprint",
            style = TextStyle(
                fontWeight = FontWeight.Bold,
                fontFamily = puddleFontFamily,
                fontSize = 18.sp,
                color = Color6,
            )
        )

        Spacer(Modifier.height(20.dp))

        Row(
            modifier = Modifier
                .align(Alignment.CenterHorizontally)
            ,
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp)
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
                    text = "Calculate",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp,
                        fontFamily = puddleFontFamily,
                        textAlign = TextAlign.Center
                    )
                )

                Spacer(Modifier.width(10.dp))

                Icon(
                    modifier = Modifier.scale(1.8f),
                    painter = painterResource(R.drawable.ixd_calculate),
                    contentDescription = "calculate"
                )
            }
            Button(
                modifier = Modifier,
                onClick = {

                    if (bitmap.value != null) {
                        val imageUri = saveBitmapToFile(context, bitmap.value!!)
                        shareImageOnWhatsApp(context, imageUri)
                    }

                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0XFFEEF9BF),
                    contentColor = Color(0xFF216869)
                ),
                shape = RoundedCornerShape(15.dp)
            ) {
                Text(
                    text = "Share",
                    style = TextStyle(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp,
                        fontFamily = puddleFontFamily,
                        textAlign = TextAlign.Center
                    )
                )

                Spacer(Modifier.width(15.dp))

                Icon(
                    modifier = Modifier.scale(2.8f),
                    painter = painterResource(R.drawable.share_icon),
                    contentDescription = "calculate"
                )
            }
        }

        Spacer(Modifier.height(10.dp))

        Text(
            modifier = Modifier
                ,
            text = "Track Weekly Progress",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                textAlign = TextAlign.Center,
                fontFamily = puddleFontFamily,
                fontSize = 24.sp,
                color = Color(0XFFEEF9BF),
            )
        )

        Spacer(Modifier.height(10.dp))



       if (wftProgress.isNotEmpty()) {
           AndroidView(
               factory = { context ->
                   val catImageView = WFTProgressImageView(wftProgress, context) { btp ->

                       bitmap.value = btp

                   }
                   catImageView
               }
           )
       }



    }

}


@Preview
@Composable
private fun PreviewDashboard() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = Color1
    ) {
        //DashboardScreen()
    }
}