package org.arghyam.puddle.presentation.dashboard.utils

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.PixelFormat
import android.net.Uri
import android.view.View
import android.view.ViewTreeObserver
import android.view.ViewTreeObserver.OnGlobalLayoutListener
import android.view.WindowManager
import android.widget.FrameLayout
import android.widget.LinearLayout
import androidx.appcompat.widget.LinearLayoutCompat
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.FileProvider
import androidx.core.view.doOnLayout
import org.arghyam.puddle.domain.models.DayWFT
import org.arghyam.puddle.ui.theme.Color4
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.Color6
import org.arghyam.puddle.ui.theme.graphLineColor
import org.arghyam.puddle.ui.theme.openSansFontFamily
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
import java.io.File

//fun captureComposableAsImage(context: Context, composable: @Composable () -> Unit): Bitmap {
//    val composeView = ComposeView(context).apply {
//        setContent {
//            composable()
//        }
//    }
//    composeView.measure(
//        View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
//        View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
//    )
//    composeView.layout(0, 0, composeView.measuredWidth, composeView.measuredHeight)
//    val bitmap = Bitmap.createBitmap(composeView.width, composeView.height, Bitmap.Config.ARGB_8888)
//    val canvas = Canvas(bitmap)
//    composeView.draw(canvas)
//    return bitmap
//}

fun captureComposableAsImage(context: Context, composable: @Composable () -> Unit, onBitmapReady: (Bitmap) -> Unit) {
    val composeView = ComposeView(context).apply {
        setContent {
            composable()
        }
    }

    val parent = FrameLayout(context).apply {
        addView(composeView)
    }

    val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    val layoutParams = WindowManager.LayoutParams(
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_APPLICATION,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
        PixelFormat.TRANSLUCENT
    )

    windowManager.addView(parent, layoutParams)

    composeView.doOnLayout {
        val bitmap = Bitmap.createBitmap(composeView.width, composeView.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        composeView.draw(canvas)
        windowManager.removeView(parent)
        onBitmapReady(bitmap)
    }
}


fun saveBitmapToFile(context: Context, bitmap: Bitmap): Uri {
    val file = File(context.cacheDir, "my_wft_image.png")
    file.outputStream().use {
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, it)
    }
    return FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
}

fun shareImageOnWhatsApp(context: Context, imageUri: Uri) {
    val intent = Intent().apply {
        action = Intent.ACTION_SEND
        putExtra(Intent.EXTRA_STREAM, imageUri)
        type = "image/png"
        setPackage("com.whatsapp")
    }
    context.startActivity(Intent.createChooser(intent, "Share Water Footprint"))
}



class GraphicUtils {
    fun createBitmapFromView(
        view: View,
        width: Int,
        height: Int
    ) : Bitmap {
        view.layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )
        view.measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )

        view.layout(0, 0, width, height)

        val canvas = Canvas()
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)

        canvas.setBitmap(bitmap)
        view.draw(canvas)

        return bitmap
    }
}

class WFTProgressImageView(
    wftProgress: List<DayWFT>,
    context: Context,
    onBitmapCreated: (bitmap: Bitmap) -> Unit
): LinearLayout(context) {
    init {
        val width = 1000
        val height = 800
        val view = ComposeView(context)

        view.layoutParams = LayoutParams(width, height)
        this.addView(view)

        view.setContent {
            ShowWFTProgress(wftProgress)
        }


        viewTreeObserver.addOnGlobalLayoutListener(object : OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                val graphicUtils = GraphicUtils()
                val bitmap = graphicUtils.createBitmapFromView(view, width, height)
                onBitmapCreated(bitmap)
                viewTreeObserver.removeOnGlobalLayoutListener(this)
            }

        })
    }
}

@Composable
fun ShowWFTProgress(
    wftProgress: List<DayWFT>
) {

    val labels = wftProgress.map {
        it.dayName
    }
    val wfts = wftProgress.map {
        it.water_footprint
    }

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
                curvedEdges = true,
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
        ),

        )
}



