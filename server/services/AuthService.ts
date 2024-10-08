import { UserDAO } from '../data/dao/user/UserDAO';
import { LoginUserReq } from '../data/requests/auth/LoginUserReq';
import { RegisterUserReq } from '../data/requests/auth/RegisterUserReq';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginUserResData } from '../data/responses/auth/LoginUserResData';
import { injected } from 'brandi';
import { TOKENS } from '../di/tokens';
import Nodemailer from 'nodemailer';
import OtpGenerator from 'otp-generator';
import { VerifyOtpResData } from '../data/responses/auth/VerifyOtpResData';
import { RegisterUserData } from '../domain/models/RegisterUserData';
import { User } from '../data/db_models/User';
import * as dotenv from 'dotenv-flow';
import { AuthError } from '../utils/errors/AuthError';
import { logger } from '..';
dotenv.config({ path: './' })




export class AuthService {


    constructor(private readonly userDAO: UserDAO) { }

    async registerUser(userData: RegisterUserReq): Promise<User> {

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(userData.password, salt);

        const userdata: RegisterUserData = {
            name: userData.name,
            email: userData.email,
            photo_url: userData.photo_url,
            password_hash: hashedPassword
        };
        const insertedUser = await this.userDAO.insertUser(userdata)

        return insertedUser;
    }


    async loginUser(userData: LoginUserReq): Promise<LoginUserResData> {


        const user = await this.userDAO.fetchUserByEmail(userData.email)

        const isMatch = bcrypt.compareSync(userData.password, user.password_hash);

        if (!isMatch) {
            throw new AuthError("user with provided credential doesn't exist", 'InvalidUserCredentials')
        }


        const secret = String(process.env.JWT_SECRET)
        const payload = { user: { email: user.email, id: user.id } };
        const token = jwt.sign(payload, secret, { expiresIn: '3600s' });

        const loginUserResData: LoginUserResData = {
            access_token: token,
            user_id: user.id,
            name: user.name,
            email: user.email
        };

        return loginUserResData;

    }

    async generateForgotPasswordOTP(email: string): Promise<number> {
        // Generate OTP
        const otp = OtpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    
        // Hash OTP
        const salt = bcrypt.genSaltSync(10);
        const hashedOTP = bcrypt.hashSync(otp, salt);
    
        // Insert OTP into the database
        const insertedOtp = await this.userDAO.insertOtp(email, hashedOTP);
    
        // Create a Nodemailer transporter
        const transporter = Nodemailer.createTransport({
          host: String(process.env.NODEMAILER_HOST),
          port: Number(process.env.NODEMAILER_PORT),
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: String(process.env.NODEMAILER_AUTH_USER),
            pass: String(process.env.NODEMAILER_AUTH_PASSWORD),
          },
        } as Nodemailer.TransportOptions);
    
        // Send OTP email
        const sendMail = async () => {
          try {
            const mailOptions = {
              from: String(process.env.NODEMAILER_SENDER_MAIL),
              to: email,
              subject: 'Forgot Password OTP for Puddle App',
              text: `Your forgot password OTP is: ${otp}`,
            };
            const info = await transporter.sendMail(mailOptions);
            logger.info(`${info}`)
            
          } catch (error) {
            logger.error('Error sending email:', error);
          }
        };
    
        await sendMail();
    
        return insertedOtp.generated_at;
      }
    
      async verifyOtp(otp: string, email: string, timestamp: number): Promise<VerifyOtpResData> {
        // Retrieve OTP from the database
        const otpRow = await this.userDAO.getOtp(email, timestamp);
    
        // Check if OTP matches
        try {
          const isMatch = bcrypt.compareSync(otp, otpRow.otp_hash);
          if (!isMatch) {
            throw new AuthError("Please enter valid OTP", 'InvalidOTPCredentials');
          }
        } catch (error) {
          throw error;
        }
    
        // Check if OTP is expired
        const now = new Date();
        const fiveMinutesAgo = now.getTime() - (5 * 60 * 1000);
        if (otpRow.generated_at < fiveMinutesAgo) {
          throw new AuthError("OTP has expired", 'OTPValidityExpired');
        }
    
        // Generate JWT token
        const secret = String(process.env.JWT_SECRET);
        const payload = { user: { email, otp } };
        const token = jwt.sign(payload, secret, { expiresIn: '300s' });
    
        return {
          access_token: token,
          email
        };
      }
    
      async resetPassword(newPassword: string, email: string): Promise<Boolean> {
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
    
        // Update password in the database
         const isUpdated = await this.userDAO.updatePassword(email, hashedPassword);

        return isUpdated;
      }
    }
  

injected(AuthService, TOKENS.userDao);