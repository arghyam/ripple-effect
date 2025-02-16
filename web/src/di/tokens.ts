import { token } from 'brandi';
import { AuthRepository } from "../domain/repository/AuthRepository";
import { UserRepository } from '../domain/repository/UserRepository';
import { LeaderboardRepository } from '../domain/repository/LeaderboardRepository';
import { QuizRepository } from '../domain/repository/QuizRepository';


export const TOKENS = {
    authRepository: token<AuthRepository>('auth_repository'),
    userRepository: token<UserRepository>('user_repository'),
    leaderboardRepository: token<LeaderboardRepository>('leaderboard_repository'),
    quizRepository: token<QuizRepository>('quiz_repository')
    
}