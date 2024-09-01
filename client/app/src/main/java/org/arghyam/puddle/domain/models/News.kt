package org.arghyam.puddle.domain.models

data class News(
    override val itemId: Int,
    override val itemType: DiscoverItemType,
    val newsId: Int,
    val title: String,
    val desc: String,
    //val content: String,
    //val thumbnail: String

): DiscoverItem()
