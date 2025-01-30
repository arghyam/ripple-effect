import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOKENS } from '../di/tokens';
import { useInjection } from 'brandi-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const LoginForm  = () => {
  const authRepository = useInjection(TOKENS.authRepository);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userDetails = { email, password };
      const response = await authRepository.loginUser(userDetails);
      if (response.access_token != null) {
        localStorage.setItem('userInfo', JSON.stringify(response.user_info));
        toast.success('Login Successful!');
        setTimeout(() => navigate('/'), 700); // Delay navigation for smooth transition
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex justify-center items-center h-screen"
    >
      <form onSubmit={handleSubmit} className="bg-white px-10 py-20 rounded-3xl shadow-md w-full max-w-md border-2 relative overflow-hidden">
        <h1 className="text-5xl font-display font-semibold">Welcome Back</h1>
        <p className="font-display font-medium text-lg text-gray-500 mt-4">Welcome back! Please login</p>
    
        <div className="mb-4 mt-8">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder='example@gmail.com'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent font-body"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="text-lg font-medium">Password</label>
          <input
            type="password"
            id="password"
            placeholder='********'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent font-body"
            required
            disabled={loading}
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
          <input
              type="checkbox"
              id="remember"
              disabled={loading}
            />
          <label htmlFor="remember" className='ml-2 font-medium text-base font-body'>Remember for 30 days</label>
          </div>
          <Link to="/forgot-password" className="font-medium text-base text-primary hover:underline">Forgot Password?</Link>
        </div>
        
        <button 
          type="submit" 
          className={`relative overflow-hidden mt-8 w-full py-3 px-4 bg-primary text-white rounded-xl font-display flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} 
          disabled={loading}
          onClick={createRipple}
        >
          {loading ? <ClipLoader size={24} color="#fff" /> : 'Login'}
          {ripple && (
            <span 
              className="absolute w-16 h-16 bg-white opacity-30 rounded-full transform scale-0 animate-ripple" 
              style={{ left: ripple.x - 32, top: ripple.y - 32 }}
            />
          )}
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-medium text-base text-primary hover:underline">Register</Link>
        </div>
        {error && <div className="text-red-500 mb-1 text-center">{error}</div>}
      </form>
    </motion.div>
  );
};

export default LoginForm;
