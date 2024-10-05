import { useState } from 'react';
import { calcWaterfootprint } from '../api/apiService';

export const useWaterFootprint = () => {
  const [totalWaterFootprint, setTotalWaterFootprint] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


 /**
 * @typedef {Object} RecipeReq
 * @property {string} recipe_id
 * @property {number} amt
 */


  const [recipeReq, setRecipeReq] = useState([]);

  /**
 * @param {RecipeReq[]} newCalcReq
 */
  const updateRecipeReq = (newCalcReq) => {
    setRecipeReq(newCalcReq);
  };
  

/**
 * @param {RecipeReq[]} req
 */
  const calculateTotalWaterFootprint = async (req) => {
    try {
      setOpen(true);
      setLoading(true);
      
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.id) {
        const userId = userInfo.id;
        const response = await calcWaterfootprint(userId, req); // Replace with your API URL
        setTotalWaterFootprint(response.water_footprint)
        
      } else {
        alert('User information not found in localStorage');
      }
      
    } catch (error) {
      setLoading(false);
      setTotalWaterFootprint(0);
      alert('Error fetching recipes: refresh the tab', error);
    }
  }


  const handleClose = () => {
    setOpen(false);
    setTotalWaterFootprint(0);
  };

  const handleShare = () => {
    alert(`Sharing water footprint value: ${totalWaterFootprint}`);
  };

  return {
    totalWaterFootprint,
    open,
    loading,
    calculateTotalWaterFootprint,
    handleClose,
    handleShare,
    updateRecipeReq
  };
};
