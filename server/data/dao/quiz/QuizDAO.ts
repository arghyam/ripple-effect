import { Question } from "../../db_models/Question";
import { Quiz } from "../../db_models/Quiz";
import { QuizScore } from "../../db_models/QuizScore";


export interface QuizDAO {

    createQuizScore(
        quizId: string,
        userId: string,
        title: string,
        score: number,
        attemptedQuestions: number,
        totalQuestions: number
    ): Promise<QuizScore>

    getQuizScoresByUserId(userId: string): Promise<QuizScore[]>

    getQuestionsByQuizId(quizId: string): Promise<Question[]>

    getQuizById(quizId: string): Promise<Quiz | null>

    createQuiz(
        title: string,
        description: string,
        totalQuestions: number,
        questions: { question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string }[]
    ): Promise<{ quiz: Quiz, questions: Question[] }>

    getAllQuizzes(): Promise<Quiz[]>
    
}