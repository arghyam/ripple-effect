import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PlayCircle, BookOpen, Mic, Loader } from "lucide-react";
import { QuizRepoImpl } from "../data/repoImpl/QuizRepoImpl";
import { QuizAttributes } from "../data/models/quiz/Quiz";
import { useEffect, useState } from "react";

// Sample Quiz Data
const sample_quiz = {
  id: 1,
  title: "Water Conservation Quiz",
  description: "Test your knowledge on water conservation and sustainability.",
  image: "./water_conservation.webp",
}

const DiscoverScreen: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizAttributes[]>([]);
  const [activeTab, setActiveTab] = useState<"quizzes" | "articles" | "podcasts">("quizzes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizRepo = new QuizRepoImpl();
        const fetchedQuizzes = await quizRepo.getAllQuizzes();
        setQuizzes(Array.isArray(fetchedQuizzes) ? fetchedQuizzes : []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Water Sustainability
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-lg"
          >
            Learn through interactive content and resources
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <motion.div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-xl shadow-sm flex gap-2">
            {[
              { id: "quizzes", icon: PlayCircle, label: "Quizzes" },
              { id: "articles", icon: BookOpen, label: "Articles" },
              { id: "podcasts", icon: Mic, label: "Podcasts" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as React.SetStateAction<"quizzes" | "articles" | "podcasts">)}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-3 bg-gray-200 rounded mb-2 w-full" />
                  <div className="h-3 bg-gray-200 rounded mb-2 w-2/3" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={sample_quiz.image || "./default_quiz_image.webp"}
                        alt={quiz.title}
                        className="w-full h-60 object-cover transform transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {quiz.description}
                      </p>
                      <button
                        onClick={() => navigate(`/quiz/${quiz.id}`)}
                        className="w-full py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <PlayCircle className="w-5 h-5" />
                        Start Quiz
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-gray-400 mb-4">No quizzes available</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-primary hover:text-primary/80 flex items-center justify-center gap-2 mx-auto"
                  >
                    <Loader className="w-5 h-5 animate-spin" />
                    Refresh
                  </button>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default DiscoverScreen;