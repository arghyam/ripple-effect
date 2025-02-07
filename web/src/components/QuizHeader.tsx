import React from "react";
import { Clock, TrendingUp, AlertCircle } from "lucide-react"; // Icons for Timer & Error
import { Button } from "../components/Button";

interface QuizHeaderProps {
  timers: number[];
  unlockedQuestionIndex: number;
  currentProgress: number;
  score: number;
  questionsLength: number;
  setShowConfirmReset: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  timers,
  unlockedQuestionIndex,
  currentProgress,
  score,
  questionsLength,
  setShowConfirmReset,
  setShowModal,
}) => {
  const currentTimer =
    timers && timers[unlockedQuestionIndex] !== undefined
      ? timers[unlockedQuestionIndex]
      : null;

  return (
    <header className="fixed top-0 w-full z-20 bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Section: Logo (Image for Desktop, Text for Mobile) & Timer */}
        <div className="flex items-center space-x-3">
          {/* Mobile Logo (Text) */}
          <span className="md:hidden text-2xl font-bold text-primary">IWP</span>

          {/* Desktop Logo (Image) */}
          <img
            src="./app_logo.avif"
            alt="IndiaWaterPortal Logo"
            className="hidden md:block h-10 w-auto object-contain"
          />

          {/* Timer (Handles Edge Cases) */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full">
            {currentTimer !== null ? (
              <>
                <Clock className="w-4 h-4 mr-1 text-primary" />
                <span className="text-sm font-medium text-gray-800">
                  {currentTimer}s
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-sm font-medium text-red-500">N/A</span>
              </>
            )}
          </div>
        </div>

        {/* Center Section: Progress Indicator (Mobile: Icon + Question Count, Desktop: Full Progress Bar) */}
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-primary font-semibold text-sm">
            {unlockedQuestionIndex + 1}/{questionsLength}
          </span>

          {/* Desktop Progress Bar */}
          <div className="hidden md:flex w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Right Section: Score (Hidden on Mobile), Reset (Text), & Submit Button */}
        <div className="flex items-center space-x-4">
          
          {/* Score (Only Visible on Desktop) */}
          <div className="hidden md:flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold min-w-[60px] justify-center">
            <span className="mr-1">Score:</span>
            <span className="font-bold text-primary">{score}</span>
          </div>

          {/* Reset Text (Takes Less Space than Button) */}
          <button
            onClick={() => setShowConfirmReset(true)}
            className="text-primary text-sm underline hover:text-primary/80"
          >
            Reset
          </button>

          {/* Submit Button (Visible on Both Desktop & Mobile) */}
          <Button
            className="bg-primary text-white px-4 py-2 hover:bg-primary/90"
            onClick={() => setShowModal(true)}
          >
            Submit
          </Button>
        </div>
      </div>
    </header>
  );
};

export default QuizHeader;
