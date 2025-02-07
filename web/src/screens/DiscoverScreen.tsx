import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlayCircle, BookOpen, Mic } from "lucide-react";

// Sample Quiz Data
const quizzes = [
  {
    id: 1,
    title: "Water Conservation Quiz",
    description: "Test your knowledge on water conservation and sustainability.",
    image: "./water_conservation.webp",
  },
];

const DiscoverScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-6 mb-10">
          <Button variant="ghost" className="text-gray-600 hover:text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Articles
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-primary flex items-center gap-2">
            <Mic className="w-5 h-5" /> Podcasts
          </Button>
          <Button variant="default" className="bg-primary text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5" /> Quizzes
          </Button>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Quiz Image */}
              <div className="relative overflow-hidden">
                <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Quiz Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{quiz.description}</p>

                {/* Start Quiz Button */}
                <Button
                  className="w-full mt-4 bg-primary text-white hover:bg-primary/90 transition-all"
                  onClick={() => navigate("/quiz")}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
