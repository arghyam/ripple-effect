package org.arghyam.puddle.domain.models


abstract class DiscoverItem {
    abstract val itemId: Int
    abstract val itemType: DiscoverItemType
}

val list = listOf(
    Article(
        itemId = 1,
        itemType = DiscoverItemType.ARTICLE,
        articleId = 1,
        title = "The Water that you eat",
        desc = "Need to shift to a more sustainable diet without compromising on major nutrients and calories"
    ),
    Podcast(
        itemId = 2,
        itemType = DiscoverItemType.PODCAST,
        podcastId = 1,
        title = "Voices for Water",
        desc = "Hear from experts"
    ),
    News(
        itemId = 3,
        itemType = DiscoverItemType.NEWS,
        newsId = 1,
        title = "Assam’s Jal Doots",
        desc = "Assam launches ambitious water scheme to train over 2 lakh students as 'Jal Doots'"
    ),
    Article(
        itemId = 4,
        itemType = DiscoverItemType.ARTICLE,
        articleId = 2,
        title = "Trading in virtual water",
        desc = "A study highlights the need to scale down the export of rice, maize, buffalo meat and other items to conserve groundwater in India."
    ),
    QuizItem(
        itemId = 5,
        itemType = DiscoverItemType.QUIZ,
        id = "quiz_1",
        title = "How much do you know about the water crisis?"
    ),
    News(
        itemId = 6,
        itemType = DiscoverItemType.NEWS,
        newsId = 2,
        title = "IPCC Climate Report - A Warning Call",
        desc = "Grounded action needed to ensure social and ecological justice"
    )
)




