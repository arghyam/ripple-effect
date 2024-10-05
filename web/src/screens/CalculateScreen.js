import React, { useState, useEffect, useRef, useCallback  } from 'react';
import RecipeSearch from '../components/wft_calculator/recipe_search/RecipeSearch';
import RecipeGrid from '../components/wft_calculator/RecipeGrid';
import { useWaterFootprint } from '../hooks/useWaterfootprint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import WaterFootprintResultDialog from '../components/wft_calculator/WaterFootprintResultDialog'
import {fetchRecipes} from '../api/apiService'

const CalculateScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();


  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  
  const handleShare = () => {
    
  }

  const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchRecipesCallback = useCallback(async (searchQuery, page, pageSize) => {
    try {
      
      const response = await fetchRecipes(searchQuery, page, pageSize);
      const transformedRecipes = response.recipes.map(recipe => ({
        ...recipe,
        quantity: Number(recipe.quantity) || 0,
        water_footprint: Number(recipe.water_footprint) || 0
      }));
     
      
      if (page === 1) {
        setRecipes(transformedRecipes);
        
      } else {
        setRecipes(prevRecipes => [...prevRecipes, ...transformedRecipes]);
       
      }

      setHasMore(response.recipes.length > 0);
    } catch (error) {
      
    }
  }, []);
  

  useEffect(() => {
     const debouncedFetch = debounce((query) => {
      setDebouncedQuery(query);
      setPage(1);
    }, 200);
    debouncedFetch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchRecipesCallback(debouncedQuery, page, pageSize);
  }, [fetchRecipesCallback, debouncedQuery, page, pageSize]);

  

  const updateRecipeQuantity = (id, quantity) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === id ? { ...recipe, quantity } : recipe
      )
    );
  };

  const lastRecipeElementRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  

    const {
        totalWaterFootprint,
        open,
        calculateTotalWaterFootprint,
        handleClose    } = useWaterFootprint()

    const onCalculate = async () => {
      const filteredRecipes = recipes.filter(recipe => recipe.quantity > 0).map(recipe => ({
        recipe_id: recipe.id,
        amt: Number(recipe.quantity)
      }));
      
      calculateTotalWaterFootprint(filteredRecipes)
    }

    const handleReset = () => {
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe => ({
          ...recipe,
          quantity: 0
        }))
      );
    }
    

    return (
      <div>
        <RecipeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} clearSearch={() => setSearchQuery('')} />
        <RecipeGrid recipes={recipes} updateRecipeQuantity={updateRecipeQuantity} lastRecipeElementRef={lastRecipeElementRef} />
        {recipes.some(recipe => recipe.quantity > 0) && (
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
              {recipes.filter(recipe => recipe.quantity > 0).length} Recipes Added
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
        <WaterFootprintResultDialog open={open} handleClose={handleClose} handleShare = {handleShare} handleReset={handleReset} footprint={totalWaterFootprint} />
      </div>
    );
};

export default CalculateScreen;
