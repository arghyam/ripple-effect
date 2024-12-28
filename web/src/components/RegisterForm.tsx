import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApiService';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userDetails = {
        name,
        email,
        password,
      };
      const response = await registerUser(userDetails); // Assume registerUser is defined elsewhere
      alert(response.message);
      navigate('/login');
    } catch (error) {
      alert('Failed to register. Please check your details.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white px-10 py-20 rounded-3xl  shadow-md w-full max-w-md border-2">
      <h1 className="text-5xl font-display font-semibold">Welcome Back</h1>
      <p className="font-display font-medium text-lg text-gray-500 mt-4">Welcome back! Please register your details</p>
        <div className="mb-4 mt-8">
          <label htmlFor="name" className="text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
             placeholder='John Doe'
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent font-body"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input
            type="email"
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
            value={password}
             placeholder='*******'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent font-body"
            required
          />
        </div>
        <button type="submit" className="mt-8 w-full py-3 px-4 bg-primary text-white rounded-xl font-display">Register</button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/login" className="font-medium text-base text-primary hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
