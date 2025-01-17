import { GenerateOTPReq } from "../../data/models/auth/GenerateOTPReq";
import { GenerateOtpResponse } from "../../data/models/auth/GenerateOtpResponse";
import { LoginUserReq } from "../../data/models/auth/LoginUserReq";
import { LoginUserResponse } from "../../data/models/auth/LoginUserResponse";
import { RegisterUserReq } from "../../data/models/auth/RegisterUserReq";
import { RegisterUserResponse } from "../../data/models/auth/RegisterUserResponse";
import { ResetPasswordReq } from "../../data/models/auth/ResetPasswordReq";
import { ResetPasswordResponse } from "../../data/models/auth/ResetPasswordResponse";
import { VerifyOTPReq } from "../../data/models/auth/VerifyOTPReq";
import { VerifyOtpResponse } from "../../data/models/auth/VerifyOtpResponse";

export interface AuthRepository {
  registerUser(userDetails: RegisterUserReq): Promise<RegisterUserResponse>;
  loginUser(userDetails: LoginUserReq): Promise<LoginUserResponse>;
  generateOtp(emailData: GenerateOTPReq): Promise<GenerateOtpResponse>;
  verifyOtp(otpData: VerifyOTPReq): Promise<VerifyOtpResponse>;
  resetPassword(passwordData: ResetPasswordReq): Promise<ResetPasswordResponse>;
}

