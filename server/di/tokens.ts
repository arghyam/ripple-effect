import { token } from 'brandi';
import { UserDAO } from '../data/dao/user/UserDAO';
import { AuthService } from '../services/AuthService';
import { WaterFtCalcDAO } from '../data/dao/waterft_calculator/WaterFtCalcDAO';
import { WaterftCalcService } from '../services/WaterFtCalcService';

export const TOKENS = {
    userDao: token<UserDAO>('user_dao'),
    authService: token<AuthService>('auth_service'),
    waterFtCalculatorDao: token<WaterFtCalcDAO>('water_ft_calc_dao'),
    waterFtCalcService: token<WaterftCalcService>('water_ft_calc_service')
  }; 