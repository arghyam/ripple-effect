import axios from "axios";
import { QuizRepository } from "../../domain/repository/QuizRepository";
import { QUIZ_ENDPOINT } from "../../utils/Constants";
import { QuizScore } from "../models/quiz/QuizScore";
import { Quiz, QuizAttributes } from "../models/quiz/Quiz";
import { QuizScoreResponse } from "../models/quiz/QuizScoreResponse";


export class QuizRepoImpl implements QuizRepository {

    async createQuizScore(quizId: string, userId: string, title: string, score: number, attemptedQuestions: number, totalQuestions: number): Promise<QuizScore> {

        const quizScoreData = {
            quizId: quizId,
            userId: userId,
            title: title,
            score: score,
            attemptedQuestions: attemptedQuestions,
            totalQuestions: totalQuestions
        };

        try {
            const response = await axios.post<QuizScore>(`${QUIZ_ENDPOINT}/create-quiz-score`, quizScoreData);
            return response.data;
          } catch (error) {
            throw error;
          }
    }

    async getQuizById(quizId: string): Promise<Quiz> {

        try {
            const response = await axios.get<Quiz>(`${QUIZ_ENDPOINT}/get-quiz/${quizId}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    }

    async getAllQuizzes(): Promise<QuizAttributes[]> {
        try {
            const response = await axios.get<QuizAttributes[]>(`${QUIZ_ENDPOINT}/get-all-quizzes`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getQuizScores(userId: string): Promise<QuizScore[]> {

        try {
            const response = await axios.get<QuizScoreResponse>(`${QUIZ_ENDPOINT}/quiz-scores/${userId}`);
            return response.data.quizScores;
          } catch (error) {
            throw error;
          }
    }

}