package org.arghyam.puddle.domain.models

data class Quiz(
    val id: String,
    val title: String,
    val questionnaire: List<Question> = emptyList(),
)

val quiz1 = Quiz(
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

val quiz2 = Quiz(
    id = "quiz_2",
    title = "Quiz 2",
    questionnaire = listOf(
        Question(
            id = 1,
            title = "Which crop uses the least water to produce 1 kilogram of yield?",
            option1 = Option(1, "Wheat - 1,800 liters"),
            option2 = Option(2, "Corn - 900 liters"),
            option3 = Option(3, "Potatoes - 300 liters"),
            option4 = Option(4, "Avocados - 2,000 liters"),
            correctOptionId = 3
        ),
        Question(
            id = 2,
            title = "On average, how much water is required to produce 1 kilogram of rice?",
            option1 = Option(1, "1,000 liters"),
            option2 = Option(2, "2,500 liters"),
            option3 = Option(3, "3,500 liters"),
            option4 = Option(4, "4,500 liters"),
            correctOptionId = 3
        ),
        Question(
            id = 3,
            title = "Which of the following is a low water-intensive crop that can be used as a staple food?",
            option1 = Option(1, "Wheat"),
            option2 = Option(2, "Sorghum"),
            option3 = Option(3, "Corn"),
            option4 = Option(4, "Oats"),
            correctOptionId = 2
        ),
        Question(
            id = 4,
            title = "Growing which of these fruits requires the most water?",
            option1 = Option(1, "Apples"),
            option2 = Option(2, "Bananas"),
            option3 = Option(3, "Oranges"),
            option4 = Option(4, "Avocados"),
            correctOptionId = 4
        ),
        Question(
            id = 5,
            title = "How many liters of water are required to produce 1 liter of almond milk?",
            option1 = Option(1, "300 liters"),
            option2 = Option(2, "600 liters"),
            option3 = Option(3, "900 liters"),
            option4 = Option(4, "1,200 liters"),
            correctOptionId = 2
        ),
        Question(
            id = 6,
            title = "Which crop is generally considered to be more water-efficient compared to others?",
            option1 = Option(1, "Rice"),
            option2 = Option(2, "Barley"),
            option3 = Option(3, "Cotton"),
            option4 = Option(4, "Soybeans"),
            correctOptionId = 2
        ),
        Question(
            id = 7,
            title = "Which of the following crops requires the least amount of water to grow?",
            option1 = Option(1, "Rice"),
            option2 = Option(2, "Almonds"),
            option3 = Option(3, "Lentils"),
            option4 = Option(4, "Sugarcane"),
            correctOptionId = 2
        ),
        Question(
            id = 8,
            title = "What is the most water-efficient way to grow vegetables?",
            option1 = Option(1, "Flood irrigation"),
            option2 = Option(2, "Drip irrigation"),
            option3 = Option(3, "Sprinkler irrigation"),
            option4 = Option(4, "Rain-fed farming"),
            correctOptionId = 2
        ),
        Question(
            id = 9,
            title = "By how much can water usage be reduced by switching from beef to chicken in a diet?",
            option1 = Option(1, "20%"),
            option2 = Option(2, "40%"),
            option3 = Option(3, "70%"),
            option4 = Option(4, "90%"),
            correctOptionId = 3
        ),
        Question(
            id = 10,
            title = "How much water is typically used to produce one cup of coffee?",
            option1 = Option(1, "50 liters"),
            option2 = Option(2, "100 liters"),
            option3 = Option(3, "140 liters"),
            option4 = Option(4, "200 liters"),
            correctOptionId = 3
        ),

    )
)

val quizList = listOf(quiz1, quiz2)
