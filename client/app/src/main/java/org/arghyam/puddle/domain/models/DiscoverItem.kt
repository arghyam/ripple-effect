package org.arghyam.puddle.domain.models

data class DiscoverItem(
    val id: Int,
    val itemType: DiscoverItemType,
    val title: String,
    val desc: String? =null,
)

val list = listOf(
    DiscoverItem(
        id = 1,
        itemType = DiscoverItemType.ARTICLE,
        title = "The Water that you eat",
        desc = "Need to shift to a more sustainable diet without compromising on major nutrients and calories"
    ),
    DiscoverItem(
        id = 2,
        itemType = DiscoverItemType.PODCAST,
        title = "Voices for Water",
        desc = "Hear from experts"
    ),
    DiscoverItem(
        id = 3,
        itemType = DiscoverItemType.NEWS,
        title = "Assam’s Jal Doots",
        desc = "Assam launches ambitious water scheme to train over 2 lakh students as 'Jal Doots'"
    ),
    DiscoverItem(
        id = 4,
        itemType = DiscoverItemType.ARTICLE,
        title = "Trading in virtual water",
        desc = "A study highlights the need to scale down the export of rice, maize, buffalo meat and other items to conserve groundwater in India."
    ),
    DiscoverItem(
        id = 5,
        itemType = DiscoverItemType.QUIZ,
        title = "How much do you know about the water crisis?"
    ),
    DiscoverItem(
        id = 6,
        itemType = DiscoverItemType.NEWS,
        title = "IPCC Climate Report - A Warning Call",
        desc = "Grounded action needed to ensure social and ecological justice"
    ),
)

enum class DiscoverItemType {

    ARTICLE,
    PODCAST,
    NEWS,
    QUIZ
}