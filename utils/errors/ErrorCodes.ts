



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


// WaterFtCalcDAO
export const InsertIngredientDAOError = 20
export const UpdateIngredientDAOError = 21
export const GetIngredientDAOError = 22
export const GetWaterConsumptionOfIngredientDAOError = 25
export const DeleteIngredientDAOError = 23
export const InsertIngredientRowDAOError = 26
export const InsertIngredientRowItemDAOError = 27


export const GetIngredientRowDAOError = 28
export const GetIngredientRowsDAOError = 29
export const GetIngredientRowItemDAOError = 30
export const GetIngredientRowItemsDAOError = 31

export const InsertWaterFtCalcResultDAOError = 32

export const IngredientNotFoundError = 24


//error
export const UserNotFoundInDB = 12
export const OTPNotFoundInDB = 13
export const InvalidUserCredentials = 14
export const ForgotPasswordEmailNotSent = 15
export const InvalidOTPCredentials = 16
export const OTPValidityExpired = 17
export const ResetPasswordTokenExpired = 18
export const InvalidResetPasswordToken = 19