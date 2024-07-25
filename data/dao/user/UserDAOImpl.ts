import { Otp } from "../../db_models/Otp";
import { RegisterUserData } from "../../../domain/models/RegisterUserData";
import { User } from "../../db_models/User";
import { FetchUserByEmail, FetchUserUserDAO, InsertOTPUserDAO, InsertUserUSerDAO, IsEmailExistUserDAO, OTPNotFoundInDB, UnknownDatabaseError, UserNotFoundInDB } from "../../../routes/auth/errorhandling/ErrorCodes";
import { AuthError, DatabaseError } from "../../../routes/auth/errorhandling/ErrorUtils";
import { UserDAO } from "./UserDAO";




export class UserDAOImpl implements UserDAO {

  async updatePassword(email: string, password: string): Promise<Boolean> {
    try {
      const [updatedCount] = await User.update({ password_hash: password }, { where: { email: email } });
      return updatedCount == 1
    } catch (error) {
      throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- updatePassword", UnknownDatabaseError);
    }
  }

  async insertOtp(email: string, otp: string): Promise<Otp> {
    try {
      const now = new Date()
      const otpData = await Otp.create({ email: email, otp_hash: otp, generated_at: now.getTime() })
      return otpData
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError(error.message, InsertOTPUserDAO);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- insertOtp", UnknownDatabaseError);
      }
    }
  }

  async getOtp(email: string, timestamp: number): Promise<Otp> {
    try {

  
      const otpRow = await Otp.findOne({
        where: {
          email: email,
          generated_at: timestamp
        }
      });

      if (otpRow == null) {
        throw new AuthError("otp with email: " + email + "doesn't exist in the database", OTPNotFoundInDB)
      }

      return otpRow
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError("error.message", IsEmailExistUserDAO);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- getOtp", UnknownDatabaseError);
      }
    }
  }




  async insertUser(userData: RegisterUserData): Promise<User> {

    try {
      const user = await User.create({ name: userData.name, email: userData.email, password_hash: userData.password_hash })
      return user
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError(error.message, InsertUserUSerDAO);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- insertUser", UnknownDatabaseError);
      }
    }


  }

  async fetchUser(userId: number): Promise<User> {

    try {
      const user = await User.findByPk(userId);

      if (user == null) {
        throw new AuthError("user with id: " + userId + "is not found in the database", UserNotFoundInDB)
      }
      return user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError(error.message, FetchUserUserDAO);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- fetchUser", UnknownDatabaseError);
      }
    }


  }

  async fetchUserByEmail(email: string): Promise<User> {

    try {
      const emailToFind = email;
      const user = await User.findOne({
        where: {
          email: emailToFind
        }
      });
      if (user == null) {
        throw new AuthError("user with email: " + email + " is not found in the database", UserNotFoundInDB)
      }
      return user;
    } catch (error) {

      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError(error.message, FetchUserByEmail);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- fetchUserByEmail", UnknownDatabaseError);
      }
    }


  }


}



