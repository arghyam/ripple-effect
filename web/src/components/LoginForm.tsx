import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKENS } from '../di/tokens';
import { useInjection } from 'brandi-react';


const LoginForm  = () => {

  const authRepository = useInjection(TOKENS.authRepository);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userDetails = { email, password };
      const response = await authRepository.loginUser(userDetails); // Assume loginUser is defined elsewhere
      alert(response.message);
      if (response.access_token != null) {
        localStorage.setItem('userInfo', JSON.stringify(response.user_info));
        navigate('/');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white px-10 py-20 rounded-3xl  shadow-md w-full max-w-md border-2">
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
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
          <input
              type="checkbox"
              id="remember"
            />
          <label htmlFor="remember" className='ml-2 font-medium text-base font-body'>Remember for 30 days</label>
          </div>
          <button id="forgot-password" className="font-medium text-base text-primary"><a href='/forgot-password'>Forgot Password?</a></button>
          
        </div>
        <div className="flex justify-end mb-4">
          
        </div>
       
        <button type="submit" className="mt-8 w-full py-3 px-4 bg-primary text-white rounded-xl font-display ">Login</button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/register" className="font-medium text-base text-primary hover:underline">Register</a>
        </div>
        {error && <div className="text-red-500 mb-1 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;


