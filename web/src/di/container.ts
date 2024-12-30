import { createContainer } from 'brandi';
import { TOKENS } from './tokens';
import { AuthRepoImpl } from '../data/repoImpl/AuthRepoImpl';
import { UserRepoImpl } from '../data/repoImpl/UserRepoImpl';
import { LeaderboardRepoImpl } from '../data/repoImpl/LeaderboardRepoImpl';


export const container = createContainer()

container
  .bind(TOKENS.authRepository)
  .toInstance(AuthRepoImpl)
  .inTransientScope()

  container
  .bind(TOKENS.userRepository)
  .toInstance(UserRepoImpl)
  .inTransientScope()

  container
  .bind(TOKENS.leaderboardRepository)
  .toInstance(LeaderboardRepoImpl)
  .inTransientScope()