
export interface QuizScore {
    id: string
    quizId: string
    userId: string
    title: string
    score: number
    attemptedQuestions: number
    totalQuestions: number
    createdAt: String
};