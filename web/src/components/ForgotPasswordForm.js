import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOtp, resetPassword, verifyOtp } from '../api/authApiService';


const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Verify OTP, Step 3: Update Password
  const navigate = useNavigate();

  const [forgotPwdOtpTp, setForgotPwdOtpTp] = useState(0);
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await generateOtp({ email });

      alert(`${response.message}`);
      if(response.created_on !== null) {
        setForgotPwdOtpTp(Number(response.created_on))
       
        setStep(2);
      }
      
    } catch (error) {
      alert(`${error.message}`);
    }

    
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOtp({ email, otp , forgotPwdOtpTp});
   
    if(response.access_token !== null || response.access_token !== "") {
      alert(`${response.message}`);
      setStep(3);
    }
    
   
      
    } catch (error) {
      setForgotPwdOtpTp(0)
      alert(`${error.message}`);
    }
    
    
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword({ email, newPassword });

   
    alert(`${response.message}`);
  
    alert('Your password has been updated');
    navigate('/login');
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setOtp(e.target.value)}
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
              onChange={(e) => setNewPassword(e.target.value)}
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

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
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
