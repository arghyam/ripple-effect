import { NextFunction, Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import { GenerateOTPReq } from '../../data/requests/auth/GenerateOTPReq';
import { LoginUserReq } from '../../data/requests/auth/LoginUserReq';
import { RegisterUserReq } from '../../data/requests/auth/RegisterUserReq';
import { ResetPasswordReq } from '../../data/requests/auth/ResetPasswordReq';
import { VerifyOTPReq } from '../../data/requests/auth/VerifyOTPReq';
import { container } from '../../di/container';
import { TOKENS } from '../../di/tokens';
import { AuthError } from '../../utils/errors/AuthError';




const router = Router();

const authService = container.get(TOKENS.authService);



router.post('/register', async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AuthError("please enter correct format of details", 'InvalidUserCredentials')
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

    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AuthError("please enter correct format of details", 'InvalidUserCredentials')
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

    next(err)
  }
});

router.post('/generate-otp', async (req, res, next) => {


  try {

    const emailData: GenerateOTPReq = req.body

    const timestamp = await authService.generateForgotPasswordOTP(emailData.email)


    res.status(200).json(
      {
        status_code: 200,
        created_on: timestamp,
        message: `otp has been sent to an email: ${emailData.email}`
      }
    );

  } catch (err) {

    next(err)
  }
});


router.post('/verify-otp', async (req, res, next) => {

  try {

    const verifyOtpReq: VerifyOTPReq = req.body

    const result = await authService.verifyOtp(verifyOtpReq.otp, verifyOtpReq.email, verifyOtpReq.created_on)

    res.status(200).json(
      {
        status_code: 200,
        access_token: result.access_token,
        message: "otp verified successfully"
      }
    );

  } catch (err) {
    next(err)
  }

});

const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message:
        'Unauthorized: Missing authorization header'
    });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({
      message: 'Unauthorized: Invalid authorization format'
    });
    return;
  }


  next();
};



router.post('/reset-password', validateAuthorization, async (req, res, next) => {

  try {
    const reqest: ResetPasswordReq = req.body

    const result = await authService.resetPassword(reqest.new_password, reqest.email)

    if (result) {
      res.status(200).json(
        {
          status_code: 200,
          reset_pwd_updated: true,
          message: "password reset successfully"
        }
      );
    } else {
      res.status(200).json(
        {
          status_code: 200,
          reset_pwd_updated: false,
          message: "password reset failed"
        }
      );
    }



  } catch (err) {

    next(err)

  }

})


export default router;
