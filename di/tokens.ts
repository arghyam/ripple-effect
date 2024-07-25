import { token } from 'brandi';
import { UserDAO } from '../data/dao/user/UserDAO';
import { AuthService } from '../services/AuthService';

export const TOKENS = {
    userDao: token<UserDAO>('user_dao'),
    authService: token<AuthService>('auth_service'),
  
  }; 