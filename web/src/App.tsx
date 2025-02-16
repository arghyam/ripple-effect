import { Route, Routes, useLocation, BrowserRouter, matchPath } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import CalculateScreen from "./screens/CalculateScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import PrivateRoute from "./components/PrivateRoute";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import { Toaster } from "react-hot-toast";
import QuizPage from "./screens/QuizScreen";
import { QuizProvider } from "./context/QuizContext";
import DiscoverScreen from "./screens/DiscoverScreen";
import QuizHistoryPage from "./screens/QuizHistoryScreen";
import DashboardTestScreen from "./screens/DashboardTestScreen";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password", "/quiz/:quizId"];

  const hideNavbar = hideNavbarRoutes.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  return (
    <div>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <QuizProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/calculate"
            element={<PrivateRoute element={<CalculateScreen />} />}
          />
          <Route
            path="/"
            element={<PrivateRoute element={<DashboardScreen />} />}
          />
          <Route
            path="/leaderboard"
            element={<PrivateRoute element={<LeaderboardScreen />} />}
          />
          <Route
            path="/discover"
            element={<PrivateRoute element={<DiscoverScreen />} />}
          />
          <Route
            path="/quiz/:quizId"
            element={<PrivateRoute element={<QuizPage />} />}
          />

          <Route
            path="/quiz-history"
            element={<PrivateRoute element={<QuizHistoryPage />} />}
          />
          <Route
            path="/dashboard-test"
            element={<PrivateRoute element={<DashboardTestScreen />} />}
          />
          

        </Routes>
      </QuizProvider>
      
    </div>
  );
};

const App = () => (
  <BrowserRouter basename={"/ripple-effect/client"}>
    <AppContent />
  </BrowserRouter>
);

export default App;
