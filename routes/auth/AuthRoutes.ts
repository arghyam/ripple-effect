import express from 'express';
import { validationResult } from 'express-validator';
import { error } from 'winston';
import { GenerateOTPReq } from '../../data/requests/GenerateOTPReq';
import { LoginUserReq } from '../../data/requests/LoginUserReq';
import { RegisterUserReq } from '../../data/requests/RegisterUserReq';
import { ResetPasswordReq } from '../../data/requests/ResetPasswordReq';
import { VerifyOTPReq } from '../../data/requests/VerifyOTPReq';
import { container } from '../../di/container';
import { TOKENS } from '../../di/tokens';
import { InvalidUserCredentials } from '../../services/utils/errors/ErrorCodes';
import { handleRegisterRouteError, handleLoginRouteError, handleGentOTPRouteError, handleVerifyOTPRouteError, handleresetPasswordRouteError } from '../../services/utils/errors/ErrorResponseUtils';
import { AuthError } from '../../services/utils/errors/ErrorUtils';



const router = express.Router();

const authService = container.get(TOKENS.authService);



router.post('/register', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AuthError("please enter correct format of details", InvalidUserCredentials)
    }
    const userData: RegisterUserReq = req.body;
    const userResData = await authService.registerUser(userData)

    res.json(
      {
        status_code: 200,
        user_info: {
          id: userResData.id,
          name: userResData.name,
          email: userResData.email
        },
        message: "user inserted succefully in the database"
      }
    )

  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      handleRegisterRouteError(err, res);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AuthError("please enter correct format of details", InvalidUserCredentials)
    }

    const userData: LoginUserReq = req.body;
    const userResData = await authService.loginUser(userData)
    res.status(200).json(
      {
        status_code: 200,
        access_token: userResData.access_token,
        user_info: {
          id: userResData.user_id,
          name: userResData.name,
          email: userResData.email
        },
        message: 'User loggedIn successfully'
      }
    );

  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      handleLoginRouteError(err, res);
    }
  }
});

router.post('/generate-otp', async (req, res) => {


  try {

    const emailData: GenerateOTPReq = req.body

    const status = await authService.generateForgotPasswordOTP(emailData.email)

    res.status(200).json(
      {
        status_code: 200,
        message: status
      }
    );

  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      handleGentOTPRouteError(err, res);
    }
  }
});


router.post('/verify-otp', async (req, res) => {

  try {

    const verifyOtpReq: VerifyOTPReq = req.body

    const result = await authService.verifyOtp(verifyOtpReq.otp, verifyOtpReq.email)

    res.status(200).json(
      {
        status_code: 200,
        access_token: result.access_token,
        message: "otp verified successfully"
      }
    );

  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      handleVerifyOTPRouteError(err, res);
    }
  }

});


router.post('/reset-password', async (req, res) => {

  try {
    const reqest: ResetPasswordReq = req.body

    const result = await authService.resetPassword(reqest.access_token, reqest.new_password, reqest.email)

    if(result) {
      res.status(200).json(
        {
          status_code: 200,
          message: "password reset successfully"
        }
      );
    } else {
      res.status(200).json(
        {
          status_code: 200,
          message: "password reset failed"
        }
      );
    }
   

  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      handleresetPasswordRouteError(err, res);
    }
    
  }
    
});

export default router;
