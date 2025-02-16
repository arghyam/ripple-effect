import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaClock, FaListAlt } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { QuizScore } from '../data/models/quiz/QuizScore';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';


const QuizHistoryPage = () => {
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);

  const quizRepo = useInjection(TOKENS.quizRepository);

  const fetchQuizScores = async (userId: string) => {
    try {
      const response = await quizRepo.getQuizScores(userId);
      setQuizScores(response);
    } catch (error) {
      setQuizScores([]);
    }
  };
  
 
  useEffect(() => {
    const userInfo: { id: string; name: string } | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (userInfo && userInfo.id) {
      fetchQuizScores(userInfo.id);
    }
  
  }, [setQuizScores]);

  const scorePercentage = (score: number, total: number) => 
    Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Quiz History
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <FaChartLine className="text-primary" />
            Track your water sustainability learning progress
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 bg-primary/10 text-gray-600 px-6 py-4 font-semibold">
            <div className="flex items-center gap-2">
              <FaListAlt className="text-primary" /> Quiz
            </div>
            <div className="flex items-center gap-2">
              <FaChartLine className="text-primary" /> Score
            </div>
            <div>Attempted</div>
            <div>Date</div>
            <div>Progress</div>
          </div>

          <AnimatePresence>
            {quizScores.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 last:border-0"
              >
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-5 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-800">{quiz.title}</div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{quiz.score}</span>
                    <span className="text-gray-500">/{quiz.totalQuestions}</span>
                  </div>

                  <div>
                    {quiz.attemptedQuestions}/{quiz.totalQuestions}
                  </div>

                  <div className="text-gray-500">
                    {format(parseISO(String(quiz.createdAt)), 'dd MMM yyyy')}
                  </div>


                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${scorePercentage(quiz.score, quiz.totalQuestions)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {scorePercentage(quiz.score, quiz.totalQuestions)}%
                    </span>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                    <span className="text-primary font-bold">
                      {quiz.score}/{quiz.totalQuestions}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <div className="text-gray-500">
                      <FaClock className="inline mr-1" />
                      {format(new Date(), 'dd MMM')}
                    </div>
                    <div>
                      Attempted: {quiz.attemptedQuestions}/{quiz.totalQuestions}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${scorePercentage(quiz.score, quiz.totalQuestions)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {scorePercentage(quiz.score, quiz.totalQuestions)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {quizScores.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-500"
            >
              No quiz attempts found. Start your first quiz!
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizHistoryPage;