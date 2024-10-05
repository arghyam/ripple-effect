import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

/**
 * @typedef {Object} RegisterUserReq
 * @property {string} name
 * @property {string} email
 * @property {string} [photo_url]
 * @property {string} password
 */

/**
 * @typedef {Object} LoginUserReq
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} GenerateOTPReq
 * @property {string} email
 */

/**
 * @typedef {Object} VerifyOTPReq
 * @property {string} email
 * @property {string} otp
 * @property {number} created_on
 */

/**
 * @typedef {Object} ResetPasswordReq
 * @property {string} email
 * @property {string} new_password
 */


/**
 * @typedef {Object} UserInfo
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} RegisterUserResponse
 * @property {number} status_code
 * @property {UserInfo} user_info
 * @property {string} message
 */

/**
 * @typedef {Object} LoginUserResponse
 * @property {number} status_code
 * @property {string} access_token
 * @property {UserInfo} user_info
 * @property {string} message
 */

/**
 * @typedef {Object} GenerateOtpResponse
 * @property {number} status_code
 * @property {number} created_on
 * @property {string} message
 */

/**
 * @typedef {Object} VerifyOtpResponse
 * @property {number} status_code
 * @property {string} access_token
 * @property {string} message
 */

/**
 * @typedef {Object} ResetPasswordResponse
 * @property {number} status_code
* @property {boolean} reset_pwd_updated
* @property {string} message
 */

/**
 * Register a new user
 * @param {RegisterUserReq} userDetails
 * @returns {Promise<RegisterUserResponse>}
 */
export const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userDetails);
   
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
export const loginUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userDetails);
    
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
export const generateOtp = async (emailData) => {
  try {
    const response = await axios.post(`${API_URL}/generate-otp`, emailData);
   
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
export const verifyOtp = async (otpData) => {
  try {
    
    const response = await axios.post(`${API_URL}/verify-otp`, otpData);

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
export const resetPassword = async (passwordData) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, passwordData);
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
