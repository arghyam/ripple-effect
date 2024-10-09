import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

interface RegisterUserReq {
  name: string;
  email: string;
  photo_url?: string;
  password: string;
}

interface LoginUserReq {
  email: string;
  password: string;
}

interface GenerateOTPReq {
  email: string;
}

interface VerifyOTPReq {
  email: string;
  otp: string;
  created_on: number;
}

interface ResetPasswordReq {
  email: string;
  new_password: string;
  authToken: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface RegisterUserResponse {
  status_code: number;
  user_info: UserInfo;
  message: string;
}

interface LoginUserResponse {
  status_code: number;
  access_token: string;
  user_info: UserInfo;
  message: string;
}

interface GenerateOtpResponse {
  status_code: number;
  created_on: number;
  message: string;
}

interface VerifyOtpResponse {
  status_code: number;
  access_token: string;
  message: string;
}

interface ResetPasswordResponse {
  status_code: number;
  reset_pwd_updated: boolean;
  message: string;
}

/**
 * Register a new user
 * @param {RegisterUserReq} userDetails
 * @returns {Promise<RegisterUserResponse>}
 */
export const registerUser = async (userDetails: RegisterUserReq): Promise<RegisterUserResponse> => {
  try {
    const response = await axios.post<RegisterUserResponse>(`${API_URL}/register`, userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login a user
 * @param {LoginUserReq} userDetails
 * @returns {Promise<LoginUserResponse>}
 */
export const loginUser = async (userDetails: LoginUserReq): Promise<LoginUserResponse> => {
  try {
    const response = await axios.post<LoginUserResponse>(`${API_URL}/login`, userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate OTP
 * @param {GenerateOTPReq} emailData
 * @returns {Promise<GenerateOtpResponse>}
 */
export const generateOtp = async (emailData: GenerateOTPReq): Promise<GenerateOtpResponse> => {
  try {
    const response = await axios.post<GenerateOtpResponse>(`${API_URL}/generate-otp`, emailData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify OTP
 * @param {VerifyOTPReq} otpData
 * @returns {Promise<VerifyOtpResponse>}
 */
export const verifyOtp = async (otpData: VerifyOTPReq): Promise<VerifyOtpResponse> => {
  try {
    const response = await axios.post<VerifyOtpResponse>(`${API_URL}/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset Password
 * @param {ResetPasswordReq} passwordData
 * @returns {Promise<ResetPasswordResponse>}
 */
export const resetPassword = async (passwordData: ResetPasswordReq): Promise<ResetPasswordResponse> => {
  try {
    const { email, new_password, authToken } = passwordData;

    const response = await axios.post<ResetPasswordResponse>(
      `${API_URL}/reset-password`,
      { email, new_password },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
