package org.arghyam.puddle.presentation.recipe

import androidx.annotation.DrawableRes
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import org.arghyam.puddle.R

@Preview
@Composable
fun RecipeScreen() {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 15.dp)
    ) {

        Text(
            text = "Water Conscious Recipes",
            fontSize = 30.sp,
            fontWeight = FontWeight.Bold,
            lineHeight = 30.sp
        )

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Water Conscious Snack Ideas",
            fontSize = 25.sp,
            //fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyRow(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(18.dp)
        ) {

            items(recipeList, key = { it.id }) {


                Column(
                    modifier = Modifier
                        .height(200.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(5.dp)

                ) {

                    AsyncImage(
                        modifier = Modifier
                            .size(150.dp)
                            .clip(RoundedCornerShape(30.dp)),
                        model = it.thumbnail_url,
                        contentScale = ContentScale.Crop,
                        contentDescription = "thumbnail"
                    )

                    Text(
                        text = it.name,
                        fontSize = 20.sp,
                        color = Color.Black
                    )

                }

            }


        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Meat Alternatives",
            fontSize = 25.sp,
            //fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyRow(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(18.dp)
        ) {

            items(recipeList, key = { it.id }) {


                Column(
                    modifier = Modifier
                        .height(200.dp)
                        .clickable {  },
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(5.dp)

                ) {

                    AsyncImage(
                        modifier = Modifier
                            .size(150.dp)
                            .clip(RoundedCornerShape(30.dp)),
                        model = it.thumbnail_url,
                        contentScale = ContentScale.Crop,
                        contentDescription = "thumbnail"
                    )

                    Text(
                        text = it.name,
                        fontSize = 20.sp,
                        color = Color.Black
                    )

                }

            }


        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "High Protein dishes",
            fontSize = 25.sp,
            //fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyRow(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(18.dp)
        ) {

            items(recipeList, key = { it.id }) {


                Column(
                    modifier = Modifier
                        .height(200.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(5.dp)

                ) {

                    AsyncImage(
                        modifier = Modifier
                            .size(150.dp)
                            .clip(RoundedCornerShape(30.dp)),
                        model = it.thumbnail_url,
                        contentScale = ContentScale.Crop,
                        contentDescription = "thumbnail"
                    )

                    Text(
                        text = it.name,
                        fontSize = 20.sp,
                        color = Color.Black
                    )

                }

            }


        }


    }
}

data class Recipe(
    val id: Int,
    @DrawableRes val thumbnail_url: Int,
    val name: String
)

val recipeList = listOf(
    Recipe(
        id = 1,
        thumbnail_url = R.drawable.tofu,
        name = "Tofu"
    ),
    Recipe(
        id = 2,
        thumbnail_url = R.drawable.ragi_dhosa,
        name = "Ragi Dhosa"
    ),
    Recipe(
        id = 3,
        thumbnail_url = R.drawable.bruschestta,
        name = "Bruschestta"
    ),
    Recipe(
        id = 4,
        thumbnail_url = R.drawable.dum_aloo,
        name = "Dum Aloo"
    ),
    Recipe(
        id = 5,
        thumbnail_url = R.drawable.pulao_saar,
        name = "Pulao Saar"
    )
)