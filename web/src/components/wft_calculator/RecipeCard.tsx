import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Recipe } from '../../screens/CalculateScreen';

interface RecipeCardProps {
  recipe: Recipe;
  updateRecipeQuantity: (id: string, quantity: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, updateRecipeQuantity }) => {
  const [quantity, setQuantity] = useState<number>(recipe.quantity);
  const [showQuantity, setShowQuantity] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>('');

  useEffect(() => {
    if (recipe.quantity === 0 && showQuantity) {
      setShowQuantity(false);
    } else if (recipe.quantity > 0 && !showQuantity) {
      setShowQuantity(true);
    }
  }, [recipe.quantity, showQuantity]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    updateRecipeQuantity(recipe.id, newQuantity);
  };

  const handleAddClick = () => {
    setShowQuantity(true);
    setQuantity(1); // Start with 1 when add is clicked
    updateRecipeQuantity(recipe.id, 1);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateRecipeQuantity(recipe.id, newQuantity);
    setAnimate('increase');
    setTimeout(() => setAnimate(''), 300);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      setShowQuantity(false);
      setQuantity(0);
      updateRecipeQuantity(recipe.id, 0);
    } else {
      const newQuantity = Math.max(0, quantity - 1);
      setQuantity(newQuantity);
      updateRecipeQuantity(recipe.id, newQuantity);
      setAnimate('decrease');
      setTimeout(() => setAnimate(''), 300);
    }
  };

  return (
    <div className="transition transform hover:scale-105">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {recipe.thumbnail_url ? (
          <img src={recipe.thumbnail_url} alt={recipe.name} className="w-full h-48 object-cover" />
        ) : (
          <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <rect width="100%" height="100%" fill="#e0e0e0" />
              <text x="50%" y="50%" textAnchor="middle" fill="#888" fontSize="20px">
                No Image Available
              </text>
            </svg>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-bold">{recipe.name}</h3>
          <p className="text-gray-700">{Math.round(recipe.water_footprint)} L per 1 Serving</p>
          {!showQuantity && (
            <button
              onClick={handleAddClick}
              className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              Add
            </button>
          )}
          {showQuantity && (
            <div
              className={`flex items-center mt-4 ${animate === 'increase' ? 'animate-bounce-up' : animate === 'decrease' ? 'animate-bounce-down' : ''}`}
            >
              <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-300 rounded-lg mr-2">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-12 text-center py-1 border border-gray-300 rounded-lg"
              />
              <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-300 rounded-lg ml-2">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
