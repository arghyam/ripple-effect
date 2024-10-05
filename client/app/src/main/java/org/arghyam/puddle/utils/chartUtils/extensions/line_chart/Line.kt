package org.arghyam.puddle.utils.chartUtils.extensions.line_chart

import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.DrawScope
import org.arghyam.puddle.utils.chartUtils.utils.calculateOffset

internal fun DrawScope.getLinePath(
    dataPoints: List<Float>,
    maxValue: Float,
    minValue: Float,
    rounded: Boolean = true,
    size: Size? = null
): Path {

    val _size = size ?: this.size
    val path = Path()

    val calculateHeight = { value: Float ->
        calculateOffset(
            maxValue = maxValue.toDouble(),
            minValue = minValue.toDouble(),
            total = _size.height,
            value = value
        )
    }

    path.moveTo(0f, (_size.height - calculateHeight(dataPoints[0])).toFloat())

    for (i in 0 until dataPoints.size - 1) {
        val x1 = (i * (_size.width / (dataPoints.size - 1)))
        val y1 = _size.height - calculateHeight(dataPoints[i]).toFloat()
        val x2 = ((i + 1) * (_size.width / (dataPoints.size - 1)))
        val y2 = _size.height - calculateHeight(dataPoints[i + 1]).toFloat()

        if (rounded) {
            val cx = (x1 + x2) / 2f
            path.cubicTo(x1 = cx, y1 = y1, x2 = cx, y2 = y2, x3 = x2, y3 = y2)
        } else {
            path.cubicTo(x1, y1, x1, y1, (x1 + x2) / 2, (y1 + y2) / 2)
            path.cubicTo((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, x2, y2)
        }
    }
    return path
}