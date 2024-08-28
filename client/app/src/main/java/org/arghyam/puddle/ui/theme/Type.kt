package org.arghyam.puddle.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R

// Set of Material typography styles to start with

val puddleFontFamily = FontFamily(
    Font(R.font.anek_latin_extra_bold, FontWeight.ExtraBold, FontStyle.Normal),
    Font(R.font.anek_latin_bold, FontWeight.Bold, FontStyle.Normal),
    Font(R.font.anek_latin_regular, FontWeight.Normal, FontStyle.Normal)
)
val openSansFontFamily = FontFamily(
    Font(R.font.open_sans_italic, FontWeight.Normal, FontStyle.Italic),
    Font(R.font.open_sans_regular, FontWeight.Normal, FontStyle.Normal),
    Font(R.font.open_sans_bold, FontWeight.Bold, FontStyle.Normal),
    Font(R.font.open_sans_bold_italic, FontWeight.Bold, FontStyle.Italic),

)
val Typography = Typography(
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    )
    /* Other default text styles to override
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
    */
)