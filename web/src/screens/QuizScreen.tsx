import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { Button } from "../components/Button";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import QuizHeader from "../components/QuizHeader";
import { QuizRepoImpl } from "../data/repoImpl/QuizRepoImpl";
import { QuestionAttributes } from "../data/models/quiz/Quiz";
import { TOKENS } from "../di/tokens";
import { useInjection } from "brandi-react";


const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const { questions, setQuestions, setScore, score, title, setTitle } = useQuiz();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [unlockedQuestionIndex, setUnlockedQuestionIndex] = useState<number>(0);
  const [timers, setTimers] = useState<number[]>(Array(questions.length).fill(30));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
   const quizRepository = useInjection(TOKENS.quizRepository);

  const navigate = useNavigate();
  const currentProgress = ((unlockedQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (unlockedQuestionIndex >= questions.length) return;

    const intervalId = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer, index) => 
          index === unlockedQuestionIndex && !selectedAnswers[index] 
            ? Math.max(timer - 1, 0) 
            : timer
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [unlockedQuestionIndex, selectedAnswers, questions]);

  useEffect(() => {
    if (timers[unlockedQuestionIndex] === 0 && !selectedAnswers[unlockedQuestionIndex]) {
      setSelectedAnswers((prev) => ({ ...prev, [unlockedQuestionIndex]: null }));
      moveToNextQuestion();
    }
  }, [timers, unlockedQuestionIndex, selectedAnswers]);


  useEffect(() => {
    const fetchQuizWithId = async () => {
    try {
    const quizRepo = new QuizRepoImpl();
    const quiz = await quizRepo.getQuizById(quizId as string);
    setQuestions(quiz.questions);
    setTitle(quiz.quiz.title);
    } catch (error) {
    console.error("Error fetching quiz questions:", error);
    }
    };
    fetchQuizWithId();
    }, [setQuestions]);

  const handleSumitQuiz = async () => {
    const userInfo: { id: string; name: string } | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (userInfo && userInfo.id && quizId) {
      await quizRepository.createQuizScore(
        quizId,
        userInfo.id,
        title,
        score,
        attemptedQuestions,
        questions.length
      )
      navigate('/discover');
    }
    
  }
  

  const moveToNextQuestion = () => {
    if (unlockedQuestionIndex < questions.length - 1) {
      setUnlockedQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleAnswerSelection = (index: number, selectedOption: string) => {
    if (selectedAnswers[index]) return;

    setSelectedAnswers((prev) => ({ ...prev, [index]: selectedOption }));

    if (selectedOption === `${questions[index].answer}`) {
      setScore((prevScore: number) => prevScore + 1);
    }
    moveToNextQuestion();
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setUnlockedQuestionIndex(0);
    setTimers(Array(questions.length).fill(30));
    setScore(0);
    setShowModal(false);
    setShowConfirmReset(false);
  };

  const attemptedQuestions = Object.keys(selectedAnswers).length;
  const notAttemptedQuestions = questions.length - attemptedQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
        
        
        {/* Quiz Header */}
        <QuizHeader
        timers={timers}
        unlockedQuestionIndex={unlockedQuestionIndex}
        currentProgress={currentProgress}
        score={score}
        questionsLength={questions.length}
        setShowConfirmReset={setShowConfirmReset}
        setShowModal={setShowModal}
      />



      {/* Main Quiz Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">
            Test Your Knowledge
          </h1>

          {questions.length > 0 && (
  <div className="space-y-8">
    {questions.map((question: QuestionAttributes, index: number) => {
      const currentTimer = timers[index]; // Fetch the timer for the current question
      const isCurrentQuestion = index === unlockedQuestionIndex;
      return (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-md p-6 transition-all ${
            index > unlockedQuestionIndex ? "opacity-50 pointer-events-none" : ""
          } ${isCurrentQuestion ? "ring-2 ring-primary" : ""}`}
        >

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-semibold text-gray-900 flex items-start gap-2">
            <span className="bg-primary text-white text-sm px-3 py-1 rounded-full flex items-center justify-center min-w-[30px] text-center">
                {index + 1}.
            </span>
            <span className="flex-1 leading-tight text-justify">{question.question}</span>
 
            <div className="md:hidden flex items-center bg-gray-100 px-3 py-1 rounded-full">
              {currentTimer !== undefined ? (
                <>
                  <Clock className="w-4 h-4 mr-1 text-primary" />
                  <span className="text-sm font-medium text-gray-800">{currentTimer}s</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                  <span className="text-sm font-medium text-red-500">N/A</span>
                </>
              )}
            </div>
            </h2>


            
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["A", "B", "C", "D"].map((option) => {
              const optionKey = `option${option}`;
              const isSelected = selectedAnswers[index] === optionKey;
              const isCorrect = optionKey === `${question.answer}`;

              return (
                <Button
                  key={optionKey}
                  variant="outline"
                  className={`relative flex items-center h-16 w-full text-left text-base font-medium transition-all 
                      px-4 py-3 border rounded-lg 
                      ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-500 text-white border-green-400 ring-2 ring-green-300"
                            : "bg-red-500 text-white border-red-400 ring-2 ring-red-300"
                          : selectedAnswers[index] && isCorrect
                          ? "bg-green-100 text-green-700 border-green-400 ring-2 ring-green-300"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                  onClick={() => handleAnswerSelection(index, optionKey)}
                  disabled={!!selectedAnswers[index] || timers[index] === 0}
                >
                  <span className="absolute left-3 font-bold text-gray-600">{option}.</span>

                  <span className="ml-8">{String(question[optionKey as keyof QuestionAttributes])}</span>



                  {isSelected && <span className="absolute right-4 text-white font-bold">✓</span>}
                </Button>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
)}

        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Quiz Complete!
              </h2>
              <p className="text-xl font-semibold text-gray-700">
                Score: {score}/{questions.length}
              </p>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Correct Answers:</span>
                <span className="font-medium text-green-600">{score}</span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect Answers:</span>
                <span className="font-medium text-red-600">{attemptedQuestions - score}</span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="font-medium text-gray-600">{notAttemptedQuestions}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Retry Quiz
              </Button>
              <Button
                onClick={handleSumitQuiz}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      )}

      {showConfirmReset && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Reset</h2>
            <p className="text-lg text-gray-700">Are you sure you want to reset the quiz?</p>
            <div className="flex space-x-4 mt-4">
              <Button onClick={() => setShowConfirmReset(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </Button>
              <Button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
