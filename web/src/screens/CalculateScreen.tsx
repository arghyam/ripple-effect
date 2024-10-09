import React, { useState, useEffect, useRef, useCallback  } from 'react';
import RecipeSearch from '../components/wft_calculator/recipe_search/RecipeSearch';
import RecipeGrid from '../components/wft_calculator/RecipeGrid';
import { useWaterFootprint } from '../hooks/useWaterfootprint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import WaterFootprintResultDialog from '../components/wft_calculator/WaterFootprintResultDialog'
import {fetchRecipes} from '../api/apiService'


export interface Recipe {
  id: string;
  name: string;
  quantity: number;
  water_footprint: number;
  thumbnail_url: string;
  
}

const CalculateScreen : React.FC = () => {

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
      alert('Error fetching recipes:');
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
          const newRecipe: Recipe = { id, name, quantity, water_footprint,  thumbnail_url};
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
  
  
  
  

    const {
        totalWaterFootprint,
        open,
        calculateTotalWaterFootprint,
        handleClose} = useWaterFootprint()

    const onCalculate = async () => {
      const filteredRecipes = addedRecipes.map(recipe => ({
        recipe_id: recipe.id,
        amt: Number(recipe.quantity)
      }));
      
      calculateTotalWaterFootprint(filteredRecipes)
    }

    const handleReset = () => {
      setAddedRecipes([])
    }

    
    

    return (
      <div>
        <RecipeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} clearSearch={() => setSearchQuery('')} />
        <RecipeGrid recipes={updatedRecipes} updateRecipeQuantity={updateRecipeQuantity} lastRecipeElementRef={lastRecipeElementObserver} />
        {addedRecipes.some(recipe => recipe.quantity > 0) && (
          <div style={{
            position: 'sticky',
            bottom: 0,
            width: '100%',
            backgroundColor: '#EEF9BF',
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white'
          }}>
            <div style={{
              color: '#216869',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: '20px'
            }}>
              {addedRecipes.filter(recipe => recipe.quantity > 0).length} Recipes Added
            </div>
            <button onClick={onCalculate}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#216869',
                color: 'white'
              }}>
              <FontAwesomeIcon icon={faCalculator} style={{ marginRight: '10px' }} />
              Calculate!
            </button>
          </div>
        )}
        <WaterFootprintResultDialog open={open} handleClose={handleClose} handleShare={handleShare} handleReset={handleReset} footprint={totalWaterFootprint} />
      </div>
    );
};

export default CalculateScreen;
