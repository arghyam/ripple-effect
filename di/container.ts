import { UserDAOImpl } from '../data/dao/user/UserDAOImpl';
import { Container } from 'brandi';
import { TOKENS } from './tokens';
import { AuthService } from '../services/AuthService';



export const container = new Container();

container
  .bind(TOKENS.userDao)
  .toInstance(UserDAOImpl)
  .inTransientScope();

container
  .bind(TOKENS.authService)
  .toInstance(AuthService)
  .inTransientScope();


