import { UserDAO } from '../data/dao/user/UserDAO';
import { LoginUserReq } from '../data/requests/LoginUserReq';
import { RegisterUserReq } from '../data/requests/RegisterUserReq';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginUserResData } from '../data/responses/LoginUserResData';
import { injected } from 'brandi';
import { TOKENS } from '../di/tokens';
import { logger } from '..';
import Nodemailer from 'nodemailer';
import OtpGenerator from 'otp-generator';
import { VerifyOtpResData } from '../data/responses/VerifyOtpResData';
import { RegisterUserData } from '../domain/models/RegisterUserData';
import { ForgotPasswordEmailNotSent, InvalidOTPCredentials, InvalidResetPasswordToken, InvalidUserCredentials, OTPValidityExpired, ResetPasswordTokenExpired } from './utils/errors/ErrorCodes';
import { User } from '../domain/models/User';
import { AuthError } from './utils/errors/ErrorUtils';


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

        // Create JWT access token
        const secret = ""
        const payload = { user: { email: user.email, id: user.id } };
        const token = jwt.sign(payload, secret, { expiresIn: '3600s' }); // Token expires in 1 hour

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
    ): Promise<string> {

        const otp = OtpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const salt = bcrypt.genSaltSync(10);
        const hashedOTP = bcrypt.hashSync(otp, salt);

        await this.userDAO.insertOtp(
            email,
            hashedOTP
        )

        const transporter = Nodemailer.createTransport(
            {
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "",
                    pass: "",
                },
            } as Nodemailer.TransportOptions
        );

        const mailOptions = {
            from: '',
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

        return "otp has been sent to an email address: " + email
    }

    async verifyOtp(otp: string, email: string): Promise<VerifyOtpResData> {

        const otpRow = await this.userDAO.getOtp(email, otp)


        const isMatch = bcrypt.compareSync(otp, otpRow.otp_hash);

        if (!isMatch) {
            throw new AuthError("please enter valid otp", InvalidOTPCredentials)
        }

        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - (5 * 60 * 1000));


        if (otpRow.generated_at < fiveMinutesAgo) {
            throw new AuthError("otp has been expired", OTPValidityExpired)
        }

        const secret = ""
        const payload = { user: { email: email, otp: otp } };
        const token = jwt.sign(payload, secret, { expiresIn: '3600s' });

        const verifyOtpResData: VerifyOtpResData = {
            access_token: token,
            email: email
        };
        return verifyOtpResData
    }


    async resetPassword(accessToken: string, newPassword: string, email: string): Promise<Boolean> {

        // Verify the token signature and decode the payload
        const secret = ""
        // throw an error is token is not valid
        const decoded = jwt.verify(accessToken, secret)

        if(!isJwtPayload(decoded)) {
            throw new AuthError("token is invalid", InvalidResetPasswordToken)
        }
       

        // Check if the token has expired (optional)
        if (decoded.exp!! < Date.now() / 1000) {
            throw new AuthError('Token is expired', ResetPasswordTokenExpired);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);


        const isUpdated = await this.userDAO.updatePassword(email, hashedPassword);

        return isUpdated
    }
}

function isJwtPayload(decoded: any): decoded is jwt.JwtPayload {
    return typeof decoded === 'object' && 'sub' in decoded; // Check for basic object and 'sub' claim
  }

injected(AuthService, TOKENS.userDao);