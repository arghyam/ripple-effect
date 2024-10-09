import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from 'react';
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
        name: name,
        email: email,
        password: password,
      };
      const response = await registerUser(userDetails);
      alert(response.message);
      navigate('/login');
    } catch (error) {
      alert('Failed to register. Please check your details.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
        <div style={styles.footer}>
          <a href="/login" style={styles.loginLink}>Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
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
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F2DFA4', // Light yellow background
    borderRadius: '15px', // Rounded corners
    padding: '10px 20px',
  },
};

export default RegisterForm;
