import { Quiz, QuizAttributes } from "../../data/models/quiz/Quiz";
import { QuizScore } from "../../data/models/quiz/QuizScore";

export interface QuizRepository {

    createQuizScore(
        quizId: string,
        userId: string,
        title: string,
        score: number,
        attemptedQuestions: number,
        totalQuestions: number
    ): Promise<QuizScore>

    getQuizById(quizId: string): Promise<Quiz>

    getAllQuizzes(): Promise<QuizAttributes[]>

    getQuizScores(userId: string): Promise<QuizScore[]>
}