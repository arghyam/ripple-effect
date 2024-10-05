package org.arghyam.puddle.presentation.discover

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.arghyam.puddle.R
import org.arghyam.puddle.domain.models.Article
import org.arghyam.puddle.domain.models.DiscoverItem
import org.arghyam.puddle.domain.models.DiscoverItemType
import org.arghyam.puddle.domain.models.News
import org.arghyam.puddle.domain.models.Podcast
import org.arghyam.puddle.domain.models.QuizItem
import org.arghyam.puddle.domain.models.list
import org.arghyam.puddle.navigation.Routes
import org.arghyam.puddle.ui.theme.Color1
import org.arghyam.puddle.ui.theme.Color3
import org.arghyam.puddle.ui.theme.Color4
import org.arghyam.puddle.ui.theme.openSansFontFamily
import org.arghyam.puddle.ui.theme.puddleFontFamily
import java.util.Locale


@Composable
fun DiscoverScreen(
    onNavigate: (String) -> Unit,
) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color1)
            .padding(horizontal = 20.dp),
    ) {


        Text(
            text = "Discover",
            style = TextStyle(
                fontWeight = FontWeight.ExtraBold,
                fontFamily = puddleFontFamily,
                fontSize = 32.sp,
                color = MaterialTheme.colorScheme.primary,
                lineHeight = 35.2.sp
            )
        )


        LazyColumn(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 20.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            items(list) {
                Spacer(modifier = Modifier.height(40.dp))
                DiscoverItem(discoverItem = it, onNavigate = onNavigate)
                Spacer(modifier = Modifier.height(30.dp))
            }
        }

        Spacer(modifier = Modifier.height(400.dp))


    }

}


@Composable
private fun DiscoverItem(
    discoverItem: DiscoverItem,
    onNavigate: (String) -> Unit
) {


    val title by remember {
        mutableStateOf(discoverItem.let {
            when (discoverItem.itemType) {
                DiscoverItemType.PODCAST -> {
                    (it as Podcast).title
                }

                DiscoverItemType.ARTICLE -> {
                    (it as Article).title
                }

                DiscoverItemType.NEWS -> {

                    (it as News).title
                }

                DiscoverItemType.QUIZ -> {
                    (it as QuizItem).title
                }
            }
        })
    }

    val desc by remember {
        mutableStateOf(discoverItem.let {
            when (discoverItem.itemType) {
                DiscoverItemType.PODCAST -> {
                    (it as Podcast).desc
                }

                DiscoverItemType.ARTICLE -> {
                    (it as Article).desc
                }

                DiscoverItemType.NEWS -> {
                    (it as News).desc
                }

                DiscoverItemType.QUIZ -> {
                    null
                }
            }
        })
    }


    Box(contentAlignment = Alignment.Center) {
        Image(
            modifier = Modifier
                .offset(x = if (discoverItem.itemType == DiscoverItemType.PODCAST) 10.dp else 0.dp)
                .scale(2.8f)
                .clickable {
                    if (discoverItem.itemType == DiscoverItemType.ARTICLE) {
                        onNavigate(Routes.ArticleScreen.route)
                    }
                    if (discoverItem.itemType == DiscoverItemType.QUIZ) {
                        onNavigate(Routes.QuizScreen.route + "?quiz_id=${(discoverItem as QuizItem).id}")
                    }
                },
            painter = painterResource(id = if (discoverItem.itemType == DiscoverItemType.PODCAST) R.drawable.podcast_discover_item_bg else R.drawable.discover_item_bg),
            contentDescription = "discover_item_bg",
            colorFilter = ColorFilter.tint(color = if (discoverItem.itemId % 2 == 0) Color3 else Color4)
        )
        Column(
            modifier = Modifier.align(Alignment.Center)
        ) {
            Text(
                text = title,
                style = TextStyle(
                    color = Color.White,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = openSansFontFamily
                )
            )
            desc?.let {
                Text(
                    text = it,
                    style = TextStyle(
                        color = Color.White,
                        fontSize = 13.sp,
                        fontStyle = FontStyle.Italic,
                        fontWeight = FontWeight.Normal,
                        fontFamily = openSansFontFamily
                    )
                )
            }
        }

        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .offset(
                    x = if (discoverItem.itemType == DiscoverItemType.PODCAST) (-10).dp else 0.dp,
                    y = if (discoverItem.itemType == DiscoverItemType.PODCAST) (-22).dp else (-20).dp
                ), contentAlignment = Alignment.Center
        ) {
            Image(
                modifier = Modifier.scale(2.7f),
                painter = painterResource(id = R.drawable.discover_item_type),
                contentDescription = "discover_item_type",
                colorFilter = ColorFilter.tint(color = if (discoverItem.itemId % 2 == 0) Color4 else Color3)
            )
            Text(
                modifier = Modifier
                    .offset(y = (-5).dp)
                    .rotate(-18f),
                text = discoverItem.itemType.name.lowercase(Locale.ROOT),
                style = TextStyle(
                    color = Color.White,
                    fontSize = 15.sp,
                    fontFamily = openSansFontFamily,
                    fontStyle = FontStyle.Italic,
                    fontWeight = FontWeight.Bold
                )
            )
        }
    }
}
