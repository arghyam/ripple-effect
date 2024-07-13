



//CRUD Operation Errors
export const InsertionError = 1
export const UpdationError = 2
export const DeletionError = 3
export const ReadError = 4

//Connection Errors
export const DatabaseDisconnected = 5



export const UnknownDatabaseError = 6

//Function Specific Errors -- UserDAO
export const IsEmailExistUserDAO = 7
export const InsertUserUSerDAO = 8
export const FetchUserUserDAO = 9
export const FetchUserByEmail = 10
export const InsertOTPUserDAO = 11


//error
export const UserNotFoundInDB = 12
export const OTPNotFoundInDB = 13
export const InvalidUserCredentials = 14
export const ForgotPasswordEmailNotSent = 15
export const InvalidOTPCredentials = 16
export const OTPValidityExpired = 17
export const ResetPasswordTokenExpired = 18
export const InvalidResetPasswordToken = 19