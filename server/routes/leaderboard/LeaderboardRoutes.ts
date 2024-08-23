import express from 'express';
import { container } from '../../di/container';
import { TOKENS } from '../../di/tokens';


const router = express.Router();

const leaderboardService = container.get(TOKENS.leaderboardService);


router.get('/get-leaderboard', async (req, res) => {
    try {
        
        const userId = req.query.userId as string
        const result = await leaderboardService.getLeaderboard(userId)
    
        res.status(200).json(
            {
              status_code: 200,
              result: result,
              message: "rank updated successfully"
            }
          );
        
       
    
      } catch (err) {
        
        if(err instanceof Error) {
          //handlegetLeaderboardRouteError(err, res)
        }
        
      }
})

router.post('/update-rank', async (req, res) => {
    try {
        
        await leaderboardService.calculateAndSaveLeaderboardRank()
    
        res.status(200).json(
            {
              status_code: 200,
              message: "rank updated successfully"
            }
          );
        
       
    
      } catch (err) {
        
        if(err instanceof Error) {
          //handleresetPasswordRouteError(err, res)
        }
        
      }
})

export default router;

