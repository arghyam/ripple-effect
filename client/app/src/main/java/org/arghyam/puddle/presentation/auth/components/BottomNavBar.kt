package org.arghyam.puddle.presentation.auth.components

import androidx.annotation.DrawableRes
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import org.arghyam.puddle.R
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.ui.theme.Color2
import org.arghyam.puddle.ui.theme.Color5
import org.arghyam.puddle.ui.theme.puddleFontFamily

@Composable
fun BottomNavBar(
    modifier: Modifier,
    currentRoute: String?,
    isVisible: Boolean,
    onNavigate: (String) -> Unit,
) {



    val screens = listOf(
        BottomNavItem.Dashboard,
        BottomNavItem.Discover,
        BottomNavItem.Plan,
        BottomNavItem.Profile
    )


    AnimatedVisibility(
        modifier = modifier,
        visible = isVisible,
        enter = slideInVertically(initialOffsetY = { it }),
        exit = slideOutVertically(targetOffsetY = { it }),
    ) {

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 15.dp, end = 15.dp, bottom = 15.dp)
                .clip(
                    RoundedCornerShape(25.dp)
                )
                .background(Color2)
                .padding(start = 20.dp, end = 20.dp, top = 8.dp, bottom = 5.dp)
                ,

            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            screens.forEach { screen ->


                val isSelected = screen.route == currentRoute
                Column(
                    modifier = Modifier.wrapContentSize().clickable {
                        if (!isSelected) {
                            onNavigate(screen.route)
                        }
                    },
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(5.dp)
                ) {

                    Icon(
                        modifier = Modifier.size(35.dp),
                        painter = painterResource(
                            id = screen.icon
                        ), contentDescription = "icon",
                        tint = if (isSelected) Color5 else Color.White
                    )
                    Text(
                        text = screen.title,
                        style = TextStyle(
                            color = if (isSelected) Color5 else Color.White ,
                            fontSize = 13.sp,
                            fontStyle = FontStyle.Normal,
                            fontWeight = FontWeight.Normal,
                            fontFamily = puddleFontFamily,
                            textAlign = TextAlign.Center
                        )
                    )
                }

            }
        }


    }

}


fun currentRoute(navController: NavHostController): String? {
    return navController.currentBackStackEntry?.destination?.route
}

sealed class BottomNavItem(val route: String, val title: String, @DrawableRes val icon: Int) {

    data object Dashboard :
        BottomNavItem(Routes.CalculateScreen.route, "Dashboard", R.drawable.ixd_calculate)

    data object Discover :
        BottomNavItem(Routes.DiscoverScreen.route, "Discover", R.drawable.ixd_discover)

    data object Plan : BottomNavItem(Routes.PlanScreen.route, "Plan", R.drawable.ixd_plan)
    data object Profile :
        BottomNavItem(Routes.ProfileScreen.route, "Profile", R.drawable.ixd_profile)


}