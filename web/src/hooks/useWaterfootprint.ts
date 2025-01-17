import { useInjection } from 'brandi-react';
import { useState } from 'react';
import { TOKENS } from '../di/tokens';

interface RecipeReq {
  recipe_id: string;
  amt: number;
}

interface UserInfo {
  id: string;
}

export const useWaterFootprint = () => {

  const userRepository = useInjection(TOKENS.userRepository);
  const [totalWaterFootprint, setTotalWaterFootprint] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const calculateTotalWaterFootprint = async (req: RecipeReq[]) => {
    try {
      setOpen(true);
      setLoading(true);

      const userInfo: UserInfo | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
      if (userInfo && userInfo.id) {
        const userId = userInfo.id;
        const response = await userRepository.calcWaterfootprint(userId, req);
        setTotalWaterFootprint(response.water_footprint);
      } else {
        alert('User information not found in localStorage');
      }
    } catch (error) {
      setLoading(false);
      setTotalWaterFootprint(0);
      alert(`Error fetching recipes: refresh the tab ${error}`);
    }
  };

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
    handleShare
  };
};
