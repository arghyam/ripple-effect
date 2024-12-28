import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import CalculateScreen from './screens/CalculateScreen';
import DashboardScreen from './screens/DashboardScreen';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import PrivateRoute from './components/PrivateRoute';
import NotAvailable from './components/NotAvailable';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/forgot-password'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/calculate" element={<PrivateRoute element={CalculateScreen} />} />
          <Route path="/" element={<PrivateRoute element={DashboardScreen} />} />
          <Route path="/leaderboard" element={<PrivateRoute element={NotAvailable} />} />
          <Route path="/discover" element={<PrivateRoute element={NotAvailable} />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
