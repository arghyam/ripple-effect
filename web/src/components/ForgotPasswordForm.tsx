import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const ForgotPasswordForm: React.FC = () => {
  const authRepository = useInjection(TOKENS.authRepository);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string>('');
  const [forgotPwdOtpTp, setForgotPwdOtpTp] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
  };

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authRepository.generateOtp({ email });
      toast.success(response.message);
      if (response.created_on !== null) {
        setForgotPwdOtpTp(Number(response.created_on));
        setStep(2);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authRepository.verifyOtp({ email, otp, created_on: forgotPwdOtpTp });
      if (response.access_token) {
        toast.success(response.message);
        setAuthToken(response.access_token);
        setStep(3);
      }
    } catch (error: any) {
      setForgotPwdOtpTp(0);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authRepository.resetPassword({ email, new_password: newPassword, authToken });
      toast.success('Your password has been updated');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md relative overflow-hidden">
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 mt-1 focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button 
              type="submit" 
              className="relative w-full py-3 bg-blue-500 text-white rounded-lg font-medium transition duration-300 transform hover:scale-105 focus:outline-none"
              onClick={createRipple}
            >
              {loading ? <ClipLoader size={24} color="#fff" /> : 'Send OTP'}
              {ripple && (
                <span 
                  className="absolute w-16 h-16 bg-white opacity-30 rounded-full transform scale-0 animate-ripple" 
                  style={{ left: ripple.x - 32, top: ripple.y - 32 }}
                />
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-lg font-medium">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 mt-1 focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button 
              type="submit" 
              className="relative w-full py-3 bg-green-500 text-white rounded-lg font-medium transition duration-300 transform hover:scale-105 focus:outline-none"
              onClick={createRipple}
            >
              {loading ? <ClipLoader size={24} color="#fff" /> : 'Verify OTP'}
              {ripple && (
                <span 
                  className="absolute w-16 h-16 bg-white opacity-30 rounded-full transform scale-0 animate-ripple" 
                  style={{ left: ripple.x - 32, top: ripple.y - 32 }}
                />
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleUpdatePassword}>
            <h2 className="text-2xl font-semibold text-center mb-6">Update Password</h2>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-lg font-medium">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 mt-1 focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button 
              type="submit" 
              className="relative w-full py-3 bg-purple-500 text-white rounded-lg font-medium transition duration-300 transform hover:scale-105 focus:outline-none"
              onClick={createRipple}
            >
              {loading ? <ClipLoader size={24} color="#fff" /> : 'Update Password'}
              {ripple && (
                <span 
                  className="absolute w-16 h-16 bg-white opacity-30 rounded-full transform scale-0 animate-ripple" 
                  style={{ left: ripple.x - 32, top: ripple.y - 32 }}
                />
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
