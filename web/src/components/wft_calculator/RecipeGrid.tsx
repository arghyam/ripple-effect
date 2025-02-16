import React, { useEffect, useState, RefCallback } from 'react';
import RecipeCard from './RecipeCard';
import Shimmer from '../Shimmer';
import { Recipe } from '../../domain/models/Recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  updateRecipeQuantity: (id: string, quantity: number) => void;
  lastRecipeElementRef: RefCallback<HTMLDivElement>;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, updateRecipeQuantity, lastRecipeElementRef }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipes.length > 0) {
      setLoading(false);
    }
  }, [recipes]);

  return (
    <div className="mt-8 container mx-auto px-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-4"> 
          {[...Array(12)].map((_, index) => ( <Shimmer key={index} /> ))} 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-4">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
              className="col-span-1"
            >
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                updateRecipeQuantity={updateRecipeQuantity}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
