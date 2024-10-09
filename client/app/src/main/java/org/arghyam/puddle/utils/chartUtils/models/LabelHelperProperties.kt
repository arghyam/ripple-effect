package org.arghyam.puddle.utils.chartUtils.models

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.sp

data class LabelHelperProperties(
    val enabled:Boolean = true,
    val textStyle: TextStyle = TextStyle.Default.copy(fontSize = 12.sp)
)