import { injected } from "brandi"
import { TOKENS } from "../di/tokens"
import { QuizDAO } from "../data/dao/quiz/QuizDAO"
import { QuizScore } from "../data/db_models/QuizScore"
import { Question } from "../data/db_models/Question"
import { Quiz } from "../data/db_models/Quiz"

export class QuizService {

    constructor(private readonly quizDAO: QuizDAO) { }

    async createQuizScore(
        quizId: string,
        userId: string,
        title: string,
        score: number,
        attemptedQuestions: number,
        totalQuestions: number
    ): Promise<QuizScore> {

        return await this.quizDAO.createQuizScore(quizId, userId, title, score, attemptedQuestions, totalQuestions)
    }

    async getQuizScoresByUserId(userId: string): Promise<QuizScore[]> {
        return await this.quizDAO.getQuizScoresByUserId(userId);
    }

    async getQuizByQuizId(quizId: string): Promise<{ quiz: Quiz | null, questions: Question[] }> {

        const quiz = await this.quizDAO.getQuizById(quizId);
        const questions = await this.quizDAO.getQuestionsByQuizId(quizId);

        return {quiz, questions}
    }

    async createQuiz(
        title: string,
        description: string,
        totalQuestions: number,
        questions: { question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string }[]
    ): Promise<{ quiz: Quiz, questions: Question[] }> {

        return await this.quizDAO.createQuiz(title, description, totalQuestions, questions);
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        return await this.quizDAO.getAllQuizzes();
    }

}


injected(QuizService, TOKENS.quizDao)