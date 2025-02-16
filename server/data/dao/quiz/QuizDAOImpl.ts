import { Question } from "../../db_models/Question";
import { Quiz } from "../../db_models/Quiz";
import { QuizScore } from "../../db_models/QuizScore";
import { QuizDAO } from "./QuizDAO";
import { v6 as uuidv6 } from "uuid";


export class QuizDAOImpl implements QuizDAO {

    async createQuizScore(quizId: string, userId: string, title: string, score: number, attemptedQuestions: number, totalQuestions: number): Promise<QuizScore> {
        const newQuizScore = await QuizScore.create({
            id: uuidv6(),
            quizId,
            userId,
            title,
            score,
            attemptedQuestions,
            totalQuestions,
        });

        return newQuizScore;
    }

    async getQuizScoresByUserId(userId: string): Promise<QuizScore[]> {
        return await QuizScore.findAll({ where: { userId } });
    }

    async getQuizById(quizId: string): Promise<Quiz | null> {
        return await Quiz.findOne({ where: { id: quizId } });
    }
    

    async getQuestionsByQuizId(quizId: string): Promise<Question[]> {
        return await Question.findAll({ where: { quizId } });
    }

    async createQuiz(
        title: string,
        description: string,
        totalQuestions: number,
        questions: { question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: string }[]
    ): Promise<{ quiz: Quiz, questions: Question[] }> {
        const quiz = await Quiz.create({
            id: uuidv6(),
            title,
            description,
            totalQuestions,
        });

        const createdQuestions = await Promise.all(questions.map(async (q) => {
            return await Question.create({
                id: uuidv6(),
                quizId: quiz.id,
                question: q.question,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                answer: q.answer
            });
        }));

        return { quiz, questions: createdQuestions };
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        return await Quiz.findAll();
    }

}


