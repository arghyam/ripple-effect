package org.arghyam.puddle.domain.models

data class Ingredient(
    val id: Int,
    val name: String,
    val amt: Int,
    val unit: String,
    val category: String
)


val sampleIngredients = listOf(
    Ingredient(
        id = 1,
        name = "Pappaiya",
        amt = 1,
        unit = "KG",
        category = "Uncooked Fruits"
    ),
    Ingredient(
        id = 2,
        name = "Banana",
        amt = 1,
        unit = "KG",
        category = "Uncooked Fruits"
    ),
    Ingredient(
        id = 3,
        name = "Chicku",
        amt = 2,
        unit = "KG",
        category = "Uncooked Fruits"
    ),
    Ingredient(
        id = 4,
        name = "Carrot",
        amt = 10,
        unit = "G",
        category = "Uncooked Vegetables"
    ),

    Ingredient(
        id = 5,
        name = "Tulsi",
        amt = 50,
        unit = "G",
        category = "Herbs"
    ),
    Ingredient(
        id = 6,
        name = "Methi",
        amt = 50,
        unit = "G",
        category = "Herbs"
    )
)
