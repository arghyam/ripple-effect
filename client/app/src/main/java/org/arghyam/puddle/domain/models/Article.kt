package org.arghyam.puddle.domain.models

data class Article(
    val articleId: Int,
    val title: String,
    val desc: String,
    override val itemId: Int,
    override val itemType: DiscoverItemType
): DiscoverItem()
