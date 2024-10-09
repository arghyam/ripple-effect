import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOtp, resetPassword, verifyOtp } from '../api/authApiService';
import { CSSProperties } from 'react';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); 
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string>('');

  const [forgotPwdOtpTp, setForgotPwdOtpTp] = useState<number>(0);

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await generateOtp({ email });

      alert(`${response.message}`);
      if (response.created_on !== null) {
        setForgotPwdOtpTp(Number(response.created_on));
        setStep(2);
      }
    } catch (error: any) {
      alert(`${error.message}`);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({ email, otp, created_on: forgotPwdOtpTp });

      if (response.access_token) {
        alert(`${response.message}`);
        setAuthToken(response.access_token);
        setStep(3);
      }
    } catch (error: any) {
      setForgotPwdOtpTp(0);
      alert(`${error.message}`);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ email, new_password: newPassword, authToken });

      alert(`${response.message}`);
      alert('Your password has been updated');
      navigate('/login');
    } catch (error: any) {
      alert(`${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      {step === 1 && (
        <form onSubmit={handleRequestOtp} style={styles.form}>
          <h2 style={styles.heading}>Forgot Password</h2>
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
          <button type="submit" style={styles.button}>Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} style={styles.form}>
          <h2 style={styles.heading}>Verify OTP</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleUpdatePassword} style={styles.form}>
          <h2 style={styles.heading}>Update Password</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Update Password</button>
        </form>
      )}
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
};

export default ForgotPasswordForm;
