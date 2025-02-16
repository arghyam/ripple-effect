import { token } from 'brandi';
import { UserDAO } from '../data/dao/user/UserDAO';
import { AuthService } from '../services/AuthService';
import { WaterFtCalcDAO } from '../data/dao/waterft_calculator/WaterFtCalcDAO';
import { WaterftCalcService } from '../services/WaterFtCalcService';
import { LeaderboardService } from '../services/LeaderboardService';
import { ProfileService } from '../services/ProfileService';
import { QuizDAO } from '../data/dao/quiz/QuizDAO';
import { QuizService } from '../services/QuizService';

export const TOKENS = {
    userDao: token<UserDAO>('user_dao'),
    quizDao: token<QuizDAO>('quiz_score_dao'),
    authService: token<AuthService>('auth_service'),
    waterFtCalculatorDao: token<WaterFtCalcDAO>('water_ft_calc_dao'),
    waterFtCalcService: token<WaterftCalcService>('water_ft_calc_service'),
    leaderboardService: token<LeaderboardService>('leaderboard_service'),
    profileService: token<ProfileService>('profile_service'),
    quizService: token<QuizService>("quiz_service")
  }