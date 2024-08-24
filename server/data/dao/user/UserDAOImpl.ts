import { Otp } from "../../db_models/Otp";
import { RegisterUserData } from "../../../domain/models/RegisterUserData";
import { User } from "../../db_models/User";
import { FetchUserByEmail, InsertOTPUserDAO, InsertUserUSerDAO, IsEmailExistUserDAO, OTPNotFoundInDB, UnknownDatabaseError, UserNotFoundInDB } from "../../../utils/errors/ErrorCodes";
import { AuthError, DatabaseError } from "../../../utils/errors/ErrorUtils";
import { UserDAO } from "./UserDAO";
import { v6 as uuidv6 } from "uuid";




export class UserDAOImpl implements UserDAO {

  async fetchUserById(id: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          id: id
        }
      });
      if (user == null) {
        throw new AuthError("user with id: " + id + " is not found in the database", UserNotFoundInDB)
      }
      return user;
    } catch (error) {

      if (error instanceof AuthError) {
        throw error
      } else if (error instanceof Error) {
        throw new DatabaseError(error.message, FetchUserByEmail);
      } else {
        throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- fetchUserById", UnknownDatabaseError);
      }
    }
  }
  async fetchUsers(): Promise<User[]> {
    try {
      return await User.findAll()
    } catch (error) {
      throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- fetchUsers", UnknownDatabaseError);
    }
  }
  async updateUserRank(userId: string, rank: number): Promise<Boolean> {
    try {
      const [updatedCount] = await User.update({ leaderboard_rank: rank }, { where: { id: userId } })
      return updatedCount == 1
    } catch (error) {
      throw new DatabaseError("e is not a instance of Error: UserDAOImpl --- updateUserRank", UnknownDatabaseError);
    }
  }

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
      const id = uuidv6()
      const otpData = await Otp.create({ id: id, email: email, otp_hash: otp, generated_at: now.getTime() })
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
      const userId = uuidv6();
      const user = await User.create({ id: userId, name: userData.name, email: userData.email, password_hash: userData.password_hash, leaderboard_rank: 0, total_water_footprint: 0})
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



