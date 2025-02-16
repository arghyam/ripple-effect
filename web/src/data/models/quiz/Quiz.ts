

export interface Quiz {
    quiz: QuizAttributes
    questions: QuestionAttributes[]
}


export interface QuizAttributes {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
    createdAt: Date;
    
}


export interface QuestionAttributes {
    id: string;
    quizId: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    createdAt?: Date;
}