import { createContext, useContext, useState, ReactNode } from "react";
import { QuestionAttributes } from "../data/models/quiz/Quiz";

// Define the shape of the context state
interface QuizContextType {
  questions: QuestionAttributes[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionAttributes[]>>;
  title: string;
  setTitle:  React.Dispatch<React.SetStateAction<string>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  timeTaken: number;
  setTimeTaken: React.Dispatch<React.SetStateAction<number>>;
}

// Creating context with default value as undefined to enforce usage within the provider
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Props type for the provider component
interface QuizProviderProps {
  children: ReactNode;
}

// QuizProvider Component
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<QuestionAttributes[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [title, setTitle] = useState<string>('')

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        title,
        setTitle,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        setScore,
        timeTaken,
        setTimeTaken,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use QuizContext
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
