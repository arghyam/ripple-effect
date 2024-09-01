package org.arghyam.puddle.domain.models

data class Quiz(
    val id: String,
    val title: String,
    val questionnaire: List<Question> = emptyList(),
)

val quiz = Quiz(
    id = "quiz_1",
    title = "How much do you know about the water crisis?",
    questionnaire = listOf(
        Question(
            id = 1,
            title = "How much of the world’s water is suitable for human use?",
            option1 = Option(1, "1%"),
            option2 = Option(2, "2.5%"),
            option3 = Option(3, "25"),
            correctOptionId = 1
        ),
        Question(
            id = 2,
            title = "Which human activity uses the most water?",
            option1 = Option(1, "Cooking"),
            option2 = Option(2, "Irrigation"),
            option3 = Option(3, "Bathing"),
            correctOptionId = 2
        ),
        Question(
            id = 3,
            title = "Which of the following takes most water to produce",
            option1 = Option(1, "Wool"),
            option2 = Option(2, "Paper"),
            option3 = Option(3, "Beer"),
            correctOptionId = 2
        )
    )
)
