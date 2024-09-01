package org.arghyam.puddle.domain.models

data class QuizItem(
    val id: String,
    val title: String,
    val questionnaire: List<Question> = emptyList(),
    override val itemId: Int,
    override val itemType: DiscoverItemType,
): DiscoverItem()