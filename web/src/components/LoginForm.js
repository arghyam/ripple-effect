import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApiService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = {
        email: email,
        password: password,
      };
      const response = await loginUser(userDetails);
      
      alert(response.message);
     if(response.access_token != null) {
      localStorage.setItem('userInfo', JSON.stringify(response.user_info));
      navigate('/');
     }
      
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to login. Please try again.');
      }
      
    }
  }
  

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.forgotPassword}>
          <a href="/forgot-password" style={styles.forgotPasswordLink}>Forgot Password?</a>
        </div>
        <button type="submit" style={styles.button}>Login</button>
        <div style={styles.register}>
          <span>Don't have an account? </span>
          <a href="/register" style={styles.registerLink}>Register</a>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    //backgroundColor: '#f7f7f7',
  },
  form: {
    backgroundColor: '#fff',
    padding: '60px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  heading: {
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  forgotPasswordLink: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  register: {
    marginTop: '20px',
    textAlign: 'center',
  },
  registerLink: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default LoginForm;