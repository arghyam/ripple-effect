import React, { useState, useEffect, useRef, useCallback } from 'react';
import RecipeGrid from '../components/wft_calculator/RecipeGrid';
import { useWaterFootprint } from '../hooks/useWaterfootprint';
import WaterFootprintResultDialog from '../components/wft_calculator/WaterFootprintResultDialog'
import Searchbar from '../components/Searchbar';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';
import { Recipe } from '../domain/models/Recipe';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCalculator, FaRedo, FaSearch } from 'react-icons/fa';



const CalculateScreen: React.FC = () => {

  const userRepository = useInjection(TOKENS.userRepository);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previousQuery, setPreviousQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addedRecipes, setAddedRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery);

  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const handleShare = () => {
    // Handle share logic
  }

  const fetchRecipesCallback = useCallback(async (searchQuery: string, page: number, pageSize: number) => {
    try {
      const response = await userRepository.fetchRecipes(searchQuery, page, pageSize);
      const transformedRecipes = response.recipes.map((recipe: any) => ({
        ...recipe,
        quantity: Number(recipe.quantity) || 0,
        water_footprint: Number(recipe.water_footprint) || 0,
      }));

      setRecipes((prevRecipes) => {
        if (page === 1) {
          return transformedRecipes;
        } else {
          return [...prevRecipes, ...transformedRecipes];
        }
      });

      setHasMore(response.recipes.length > 0);
    } catch (error) {
      // alert('Error fetching recipes');
    }
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce((query: string) => {
      setDebouncedQuery(query);
      setPage(1);
    }, 200);
    debouncedFetch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery !== previousQuery) {
      setRecipes([]); // Clear recipes when a new search query is entered
    }
    setPreviousQuery(debouncedQuery);
    fetchRecipesCallback(debouncedQuery, page, pageSize);
  }, [fetchRecipesCallback, debouncedQuery, page, pageSize, previousQuery]);

  const updateRecipeQuantity = (id: string, quantity: number) => {
    setAddedRecipes((prevAddedRecipes) => {
      const existingRecipeIndex = prevAddedRecipes.findIndex((recipe) => recipe.id === id);
      if (existingRecipeIndex !== -1) {
        const updatedRecipes = [...prevAddedRecipes];
        updatedRecipes[existingRecipeIndex] = { ...updatedRecipes[existingRecipeIndex], quantity };
        return updatedRecipes;
      } else {
        const existingRecipe = recipes.find((recipe) => recipe.id === id);
        if (existingRecipe) {
          const { name, water_footprint, thumbnail_url } = existingRecipe;
          const newRecipe: Recipe = { id, name, quantity, water_footprint, thumbnail_url };
          const updatedRecipes = [...prevAddedRecipes, newRecipe];
          return updatedRecipes;
        } else {
          return prevAddedRecipes;
        }
      }
    });
  };

  const lastRecipeElementObserver = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const updatedRecipes = recipes.map((recipe) => {
    const addedRecipe = addedRecipes.find((added) => added.id === recipe.id);
    if (addedRecipe) {
      return { ...recipe, quantity: addedRecipe.quantity };
    } else {
      return recipe;
    }
  });

  const { totalWaterFootprint, open, calculateTotalWaterFootprint, handleClose } = useWaterFootprint();

  const onCalculate = async () => {
    const filteredRecipes = addedRecipes.map(recipe => ({
      recipe_id: recipe.id,
      amt: Number(recipe.quantity)
    }));
    calculateTotalWaterFootprint(filteredRecipes);
  }

  const handleReset = () => {
    setAddedRecipes([]);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Water Footprint Calculator
          </h1>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <FaSearch className="text-primary" />
            Search and calculate water usage for your recipes
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="mb-8"
        >
          <Searchbar 
            query={searchQuery} 
            onQueryChange={setSearchQuery} 
            onSearch={() => setSearchQuery('')}
          
          />
        </motion.div>

        {/* Recipe Grid */}
        <RecipeGrid 
          recipes={updatedRecipes} 
          updateRecipeQuantity={updateRecipeQuantity} 
          lastRecipeElementRef={lastRecipeElementObserver}
        />

        {/* Floating Action Buttons */}
        <AnimatePresence>
          {addedRecipes.some(recipe => recipe.quantity > 0) && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 right-6 flex gap-4"
            >
              <button
                onClick={handleReset}
                className="p-4 bg-white text-primary rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center"
              >
                <FaRedo className="text-xl" />
              </button>
              
              <button
                onClick={onCalculate}
                className="p-6 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <FaCalculator className="text-xl" />
                <span className="hidden md:inline">Calculate</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Dialog */}
        <WaterFootprintResultDialog 
          open={open} 
          handleClose={handleClose} 
          handleShare={handleShare} 
          handleReset={handleReset} 
          footprint={totalWaterFootprint}
        />
      </div>
    </motion.div>
  );
};




export default CalculateScreen;
