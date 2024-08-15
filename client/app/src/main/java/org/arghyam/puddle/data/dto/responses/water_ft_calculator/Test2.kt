package org.arghyam.puddle.data.dto.responses.water_ft_calculator

import androidx.compose.foundation.border
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.decode.SvgDecoder
import coil.request.ImageRequest
import org.arghyam.puddle.presentation.waterfootprint_calculator.WaterFtCalcViewModel
import org.arghyam.puddle.utils.SERVER_URL
import org.koin.androidx.compose.koinViewModel

@Preview
@Composable
fun Test2Screen(
    waterFtCalcViewModel: WaterFtCalcViewModel = koinViewModel()
) {


    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data("$SERVER_URL/images/test.svg") // Replace with your SVG image URL
            .decoderFactory(SvgDecoder.Factory())
            .build(),
        contentDescription = null,
        modifier = Modifier.border(5.dp, Color.Blue)
    )
}



