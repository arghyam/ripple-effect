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
import { ForgotPasswordEmailNotSent, InvalidOTPCredentials, InvalidResetPasswordToken, InvalidUserCredentials, OTPValidityExpired, ResetPasswordTokenExpired } from '../utils/errors/ErrorCodes';
import { User } from '../data/db_models/User';
import { AuthError } from '../utils/errors/ErrorUtils';
import * as dotenv from 'dotenv-flow';
dotenv.config({ path: './' })




export class AuthService {

    
    constructor(private readonly userDAO: UserDAO) { }

    async registerUser(userData: RegisterUserReq): Promise<User> {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);

        const userdata: RegisterUserData = {
            name: userData.name,
            email: userData.email,
            password_hash: hashedPassword
        };
        const insertedUser = await this.userDAO.insertUser(userdata)

        return insertedUser;
    }


    async loginUser(userData: LoginUserReq): Promise<LoginUserResData> {


        const user = await this.userDAO.fetchUserByEmail(userData.email)

        const isMatch = bcrypt.compareSync(userData.password, user.password_hash);

        if (!isMatch) {
            throw new AuthError("user with provided credential doesn't exist", InvalidUserCredentials)
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

    async generateForgotPasswordOTP(
        email: string,
    ): Promise<number> {

        const otp = OtpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const salt = bcrypt.genSaltSync(10);
        const hashedOTP = bcrypt.hashSync(otp, salt);

        const insertedOtp = await this.userDAO.insertOtp(
            email,
            hashedOTP
        )

        const transporter = Nodemailer.createTransport(
            {
                host: String(process.env.NODEMAILER_HOST),
                port: Number(process.env.NODEMAILER_PORT),
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: String(process.env.NODEMAILER_AUTH_USER),
                    pass: String(process.env.NODEMAILER_AUTH_PASSWORD),
                },
            } as Nodemailer.TransportOptions
        );

        const mailOptions = {
            from: String(process.env.NODEMAILER_SENDER_MAIL),
            to: email,
            subject: 'Forgot password otp for Puddle App',
            text: 'your forgot password otp is: ' + otp,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                throw new AuthError("we're facing an issue to send an email: " + error.message, ForgotPasswordEmailNotSent);
            

            } else {
                console.log('Email sent: %s', info);

            }
        });

        return insertedOtp.generated_at
    }

    async verifyOtp(otp: string, email: string, timestamp: number): Promise<VerifyOtpResData> {

    

        const otpRow = await this.userDAO.getOtp(email, timestamp)


        const isMatch = bcrypt.compareSync(otp, otpRow.otp_hash);

        if (!isMatch) {
            throw new AuthError("please enter valid otp", InvalidOTPCredentials)
        }

        const now = new Date();
        const fiveMinutesAgo = now.getTime() - (5 * 60 * 1000);


        if (otpRow.generated_at < fiveMinutesAgo) {
            throw new AuthError("otp has been expired", OTPValidityExpired)
        }

        const secret = String(process.env.JWT_SECRET)
        const payload = { user: { email: email, otp: otp } };
        const token = jwt.sign(payload, secret, { expiresIn: '300s' });

        const verifyOtpResData: VerifyOtpResData = {
            access_token: token,
            email: email
        };
        return verifyOtpResData
    }


    async resetPassword(newPassword: string, email: string): Promise<Boolean> {
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);


        const isUpdated = await this.userDAO.updatePassword(email, hashedPassword);

        return isUpdated
    }
}

injected(AuthService, TOKENS.userDao);