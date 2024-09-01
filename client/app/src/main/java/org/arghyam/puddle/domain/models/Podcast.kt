package org.arghyam.puddle.domain.models

data class Podcast(
    override val itemId: Int,
    override val itemType: DiscoverItemType,
    val podcastId: Int,
    val title: String,
    val desc: String

): DiscoverItem()
