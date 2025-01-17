import axios from "axios";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { AUTH_ENDPOINT } from "../../utils/Constants";
import { GenerateOTPReq } from "../models/auth/GenerateOTPReq";
import { GenerateOtpResponse } from "../models/auth/GenerateOtpResponse";
import { LoginUserReq } from "../models/auth/LoginUserReq";
import { LoginUserResponse } from "../models/auth/LoginUserResponse";
import { RegisterUserReq } from "../models/auth/RegisterUserReq";
import { RegisterUserResponse } from "../models/auth/RegisterUserResponse";
import { ResetPasswordReq } from "../models/auth/ResetPasswordReq";
import { ResetPasswordResponse } from "../models/auth/ResetPasswordResponse";
import { VerifyOTPReq } from "../models/auth/VerifyOTPReq";
import { VerifyOtpResponse } from "../models/auth/VerifyOtpResponse";



export class AuthRepoImpl implements AuthRepository {
  async registerUser(userDetails: RegisterUserReq): Promise<RegisterUserResponse> {
    try {
      const response = await axios.post<RegisterUserResponse>(`${AUTH_ENDPOINT}/register`, userDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(userDetails: LoginUserReq): Promise<LoginUserResponse> {
    try {
      const response = await axios.post<LoginUserResponse>(`${AUTH_ENDPOINT}/login`, userDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async generateOtp(emailData: GenerateOTPReq): Promise<GenerateOtpResponse> {
    try {
      const response = await axios.post<GenerateOtpResponse>(`${AUTH_ENDPOINT}/generate-otp`, emailData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(otpData: VerifyOTPReq): Promise<VerifyOtpResponse> {
    try {
      const response = await axios.post<VerifyOtpResponse>(`${AUTH_ENDPOINT}/verify-otp`, otpData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(passwordData: ResetPasswordReq): Promise<ResetPasswordResponse> {
    try {
      const { email, new_password, authToken } = passwordData;
      const response = await axios.post<ResetPasswordResponse>(
        `${AUTH_ENDPOINT}/reset-password`,
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
  }
}
