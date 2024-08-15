package org.arghyam.puddle.presentation.plan

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import org.arghyam.puddle.R

@Composable
fun MealPlannerScreen() {

    Column(
        modifier = Modifier.fillMaxSize()
    ) {

        Text(text = "Here’s your 5 Day Meal Plan:")

        Box {
            Image(
                painter = painterResource(id = R.drawable.mealplan_bg),
                contentDescription = "meal planner bg"
            )

            Box() {
                Image(painter = painterResource(id = R.drawable.snack_bg), contentDescription = "snack bg")

                Column {
                    Text(text = "Breakfast")
                    Text(text = "Recipe name")
                }
            }
        }

    }
}