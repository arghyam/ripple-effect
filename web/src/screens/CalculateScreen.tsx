import React, { useState, useEffect, useRef, useCallback } from 'react';
import RecipeGrid from '../components/wft_calculator/RecipeGrid';
import { useWaterFootprint } from '../hooks/useWaterfootprint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import WaterFootprintResultDialog from '../components/wft_calculator/WaterFootprintResultDialog'
import { fetchRecipes } from '../api/apiService'
import Searchbar from '../components/Searchbar';

export interface Recipe {
  id: string;
  name: string;
  quantity: number;
  water_footprint: number;
  thumbnail_url: string;
}

const CalculateScreen: React.FC = () => {
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
      const response = await fetchRecipes(searchQuery, page, pageSize);
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
      alert('Error fetching recipes');
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
    <div className='mt-5'>
      <Searchbar query={searchQuery} onQueryChange={setSearchQuery} onSearch={() => setSearchQuery('')} />
      <RecipeGrid recipes={updatedRecipes} updateRecipeQuantity={updateRecipeQuantity} lastRecipeElementRef={lastRecipeElementObserver} />
      {addedRecipes.some(recipe => recipe.quantity > 0) && (
        <div className="sticky bottom-0 w-full bg-green-100 py-2 flex justify-between items-center text-white">
          <div className="text-green-800 text-lg font-bold ml-5">
            {addedRecipes.filter(recipe => recipe.quantity > 0).length} Recipes Added
          </div>
          <button onClick={onCalculate} className="py-2 px-4 text-lg rounded-lg cursor-pointer mr-5 flex items-center bg-green-800 text-white">
            <FontAwesomeIcon icon={faCalculator} className="mr-2" />
            Calculate!
          </button>
        </div>
      )}
      <WaterFootprintResultDialog open={open} handleClose={handleClose} handleShare={handleShare} handleReset={handleReset} footprint={totalWaterFootprint} />
    </div>
  );
};

export default CalculateScreen;
