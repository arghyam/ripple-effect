import express from "express";
import axios from "axios";
import { logger } from "..";
import { v6 as uuidv6 } from "uuid";
import { Ingredient } from '../data/db_models/Ingredient';
import { IngredientData2, Recipe } from "../data/db_models/Recipe";

const router = express.Router();

// const recipes: string[] = [
//     "aloo gobi", "aloo matar", "aloo tikki", "baingan bharta", "bhindi masala", "butter chicken", "chana masala", 
//     "chicken 65", "chicken biryani", "chicken korma", "chicken tikka", "chicken vindaloo", "dal fry", "dal makhani", 
//     "dhokla", "dum aloo", "fish curry", "gajar halwa", "gobi manchurian", "gulab jamun", "hyderabadi biryani", "idli", 
//     "jalebi", "kadai paneer", "kheer", "kofta", "lassi", "matar paneer", "methi thepla", "mutton curry", "naan", 
//     "palak paneer", "paneer butter masala", "paneer tikka", "pani puri", "pav bhaji", "poha", "prawn curry", "pulao", 
//     "raita", "rajma", "rasgulla", "rava dosa", "rogan josh", "samosa", "sev puri", "shahi paneer", "tandoori chicken", 
//     "upma", "vada pav", "vegetable biryani", "vegetable korma", "vegetable pulao", "vegetable samosa", "vegetable stew", 
//     "aloo paratha", "baida roti", "bhel puri", "bhutta", "chole bhature", "dahi puri", "dosa", "egg curry", "fish fry", 
//     "gobi paratha", "haleem", "idiyappam", "kachori", "kadhi", "kathi roll", "keema", "kesar pista", "kheema pav", 
//     "kofta curry", "kulfi", "lamb curry", "lemon rice", "malai kofta", "masala chai", "masala dosa", "misal pav", 
//     "mutton biryani", "nihari", "onion bhaji", "pesarattu", "phirni", "pongal", "prawn masala", "prawn pulao", "puri", 
//     "rasam", "sabudana khichdi", "sambar", "sheer khurma", "shrikhand", "sooji halwa", "stuffed paratha", "tandoori roti", 
//     "thali", "tomato rice", "uttapam", "vada", "vegetable curry", "vegetable pakora", "vegetable soup", "aloo chaat", 
//     "amritsari fish", "anda bhurji", "banana chips", "bengali fish curry", "besan ladoo", "bhindi fry", "bisi bele bath", 
//     "butter naan", "chana dal", "chana sundal", "chole", "corn pakora", "curd rice", "dal tadka", "dum biryani", 
//     "egg biryani", "gatte ki sabzi", "hara bhara kabab", "jeera rice", "kadai chicken", "kadhi pakora", "mango lassi", 
//     "methi malai", "paneer bhurji", "dabli", "manchurian", "veg manchurian", "chilli paneer", "veg fried rice", 
//     "schezwan noodles", "hakka noodles", "spring rolls", "veg momos", "chicken momos", "paneer momos", "veg chowmein", 
//     "chicken chowmein", "veg spring rolls", "chicken spring rolls", "veg hakka noodles", "chicken hakka noodles", 
//     "schezwan fried rice", "veg schezwan noodles", "chicken schezwan noodles", "veg chilli garlic noodles", 
//     "chicken chilli garlic noodles", "veg manchow soup", "chicken manchow soup", "hot and sour soup", "sweet corn soup", 
//     "tom yum soup", "veg clear soup", "chicken clear soup", "veg wonton soup", "chicken wonton soup", "veg hot and sour soup", 
//     "chicken hot and sour soup", "veg sweet corn soup", "chicken sweet corn soup", "veg tom yum soup", "chicken tom yum soup", 
//     "veg lemon coriander soup", "chicken lemon coriander soup", "veg thai curry", "chicken thai curry", "veg green curry", 
//     "chicken green curry", "veg red curry", "chicken red curry", "veg massaman curry", "chicken massaman curry", 
//     "veg panang curry", "chicken panang curry", "veg khao suey", "chicken khao suey", "veg pad thai", "chicken pad thai", 
//     "veg basil fried rice", "chicken basil fried rice", "veg basil noodles", "chicken basil noodles", "veg basil stir fry", 
//     "chicken basil stir fry", "veg basil tofu", "chicken basil tofu", "veg basil chicken", "chicken basil chicken", 
//     "veg basil fish", "chicken basil fish", "veg basil prawns", "chicken basil prawns", "veg basil squid", "chicken basil squid"
// ];

// const recipes: string[] = [
//     "paneer bhurji",
//     "methi malai murg",
//     "chicken chettinad",
//     "mutton rogan josh",
//     "prawn malai curry",
//     "fish amritsari",
//     "egg bhurji",
//     "paneer tikka masala",
//     "chicken handi",
//     "mutton keema",
//     "prawn balchao",
//     "fish tikka",
//     "egg curry",
//     "paneer lababdar",
//     "chicken rezala",
//     "mutton shami kebab",
//     "prawn pulao",
//     "fish moilee",
//     "egg biryani",
//     "paneer pasanda",
//     "chicken cafreal",
//     "mutton galouti kebab",
//     "prawn biryani",
//     "fish fry",
//     "egg bhurji",
//     "paneer do pyaza",
//     "chicken xacuti",
//     "mutton nihari",
//     "prawn curry",
//     "fish curry",
//     "egg masala",
//     "paneer korma",
//     "chicken 65",
//     "mutton biryani",
//     "prawn masala",
//     "fish tandoori",
//     "egg fry",
//     "paneer butter masala",
//     "chicken tikka masala",
//     "mutton curry",
//     "prawn fry",
//     "fish kebab",
//     "egg roast",
//     "paneer tikka",
//     "chicken korma",
//     "mutton fry",
//     "prawn kebab",
//     "fish biryani",
//     "egg bhurji",
//     "paneer bhurji"
// ];
// const recipes: string[] = [
//     "bombay potatoes",
//     "yogurt sandwich",
//     "egg curry",
//     "paneer sandwich",
//     "chilli chicken",
//     "curried roasted carrots",
//     "chilli paneer",
//     "parinde main parinda",
//     "shufta kanaguchhi",
//     "phulkari pulao",
//     "jadoh",
//     "tit-koh",
//     "bisi bele bath",
//     "besan ladoo",
//     "banana chips",
//     "amritsari fish",
//     "aloo chaat",
//     "vegetable stew",
//     "vegetable samosa",
//     "vegetable pulao"
// ];


const recipes = [
    "bombay potatoes",
    "yogurt sandwich",
    "curried roasted carrots",
    "shrikhand tart",
    "maddur vada",
    "kachchhi dabeli"
];






router.get('/add-data', (req, res) => {
    let index = 0;

    const intervalId = setInterval(async () => {
        if (index >= recipes.length) {
            clearInterval(intervalId);
            res.send('All recipes processed');
            return;
        }

        const recipeBatch = recipes.slice(index, index + 5);

        try {
            logger.info(`recipes ${recipeBatch.join(', ')}`)
            const response = await axios.get<ApiResponse>('https://ripple-api.buckets.growsoc.arpan.xyz/find-igs', {
                params: {
                    recipe1: recipeBatch[0] || '',
                    recipe2: recipeBatch[1] || '',
                    recipe3: recipeBatch[2] || '',
                    recipe4: recipeBatch[3] || '',
                    recipe5: recipeBatch[4] || ''
                }
            });

            const recipeList = response.data.output




            recipeList.forEach(async (recipe) => {
                const recipeId = uuidv6();

                const existingRecipe = await Recipe.findOne({ where: { name: recipe.name } });
                if (existingRecipe) {
                    logger.info(`Recipe ${recipe.name} already exists. Skipping.`);
                    return;
                }

                const ingredients: IngredientData2[] = [];

                // Use for...of loop to handle async operations
                for (const ingredient of recipe.ingredients) {
                    const ingredientId = uuidv6();

                    const existingIngredient = await Ingredient.findOne({ where: { name: ingredient.name } });

                    if (existingIngredient) {
                        ingredients.push({
                            id: existingIngredient.id,
                            name: ingredient.name,
                            unit: ingredient.unit,
                            quantity: ingredient.quantityinvalue
                        });
                    } else {
                        ingredients.push({
                            id: ingredientId,
                            name: ingredient.name,
                            unit: ingredient.unit,
                            quantity: ingredient.quantityinvalue
                        });

                        await Ingredient.create({
                            id: ingredientId,
                            name: ingredient.name,
                            unit: "g",
                            water_footprint: 0, // Adjust as needed
                            last_updated: new Date()
                        });
                    }
                }

                // Insert into Recipe table
                await Recipe.create({
                    id: recipeId,
                    name: recipe.name,
                    unit: "", // Adjust as needed
                    water_footprint: 0, // Adjust as needed,
                    ingredients: ingredients,
                    thumbnail_url: ""
                });
            });

            logger.info(`Response for recipes ${recipeBatch.join(', ')}:`, response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                logger.error(`Axios error for recipes ${recipeBatch.join(', ')}:`, error.message);
            } else {
                logger.error(`Unexpected error for recipes ${recipeBatch.join(', ')}:`, error);
            }
        }

        index += 5; // Move to the next set of recipes
    }, 10000); // 10 seconds interval
});


router.get('/gen-ids', async (req, res) => {

    const ids = generateArrayWithUUIDs(15)

    ids.forEach(idObject => {
        logger.info(`IDo: ${idObject.id}`);
    });

   
})

function generateArrayWithUUIDs(size: number) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push({ id: uuidv6() });
    }
    return array;
}


router.get('/convert-json', async (req, res) => {

    try {
        const recipes = await Recipe.findAll()

        recipes.forEach(async (recipe) => {

            let wtf: number = 0

            for (const ingredient of recipe.ingredients) {

                const ing = await Ingredient.findOne({
                    where: {
                        name: ingredient.name
                    }
                })

                if (ing == null) {
                    throw Error(`ingredient match not found recipe: ${ingredient.name}`)
                }

                const recipeIngUnit = ingredient.unit

                //1 cup = 0.635 kg
                const recipeAmtInKg = recipeIngUnit === "tsp" ? 0.00426 :
          recipeIngUnit === "cup" ? 0.24 :
          recipeIngUnit === "kg" ? 1 :
          recipeIngUnit === "g" || recipeIngUnit === "gram" ? 0.001 :
          recipeIngUnit === "tbsp" ? 0.01479 :
          recipeIngUnit === "pinch"? 0.00036 :
          recipeIngUnit === "pieces"? 0.05 :
          recipeIngUnit === "cloves"? 0.045 :
          0; // Default value if unit is not recognized


                if(recipeAmtInKg == 0) {
                    wtf = 0
                    return
                }

                //coverted unit conversion
                const recipeIngQuantity = Number(removeSubstringAfterHyphen(ingredient.quantity.split(' ')[0]))

                const calc_wft = (recipeIngQuantity * recipeAmtInKg * ing.water_footprint)

                wtf += calc_wft

                




            }

            //store to recipe row

            Recipe.update(
                {
                    water_footprint: parseFloat(wtf.toFixed(4))
                },
                {
                    where: {
                        name: recipe.name
                    }
                }
            )
        }
        )


    } catch (error) {

    }
})

function removeSubstringAfterHyphen(input: string): number | string {
    // Remove substring starting with '-'
    let cleanedString = input.includes('-') ? input.split('-')[0] : input;

    // Remove units like 'g'
    cleanedString = cleanedString.replace(/[a-zA-Z]+$/, '');

    // Check if the remaining string contains '/'
    if (cleanedString.includes('/')) {
        const [numerator, denominator] = cleanedString.split('/').map(Number);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            const result = numerator / denominator;
            return parseFloat(result.toFixed(4));
        } else {
            return 'Invalid division';
        }
    }

    return cleanedString;
}



interface IngredientData {
    quantityinvalue: string;
    unit: string;
    name: string;
}

interface RecipeData {
    name: string;
    thumbnail: string;
    ingredients: IngredientData[];
}

interface ApiResponse {
    referenceslinks: any[];
    output: RecipeData[];
}


export default router