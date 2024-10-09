import { Otp } from "../../db_models/Otp";
import { RegisterUserData } from "../../../domain/models/RegisterUserData";
import { User } from "../../db_models/User";
import { UserDAO } from "./UserDAO";
import { v6 as uuidv6 } from "uuid";
import sequelize from "../../../db";
import { Transaction } from "sequelize";
import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { logger } from "../../..";





export class UserDAOImpl implements UserDAO {

  
  async getUserWft(userId: string): Promise<number> {
    try {

      const user = await User.findOne(
        { where: { id: userId } }
      )

      if(user == null) {
        throw new NotFoundError(`User Not Found with id: ${userId}`, 'USER_NOT_FOUND');
      }
      return user.total_water_footprint
    } catch (error) {
      throw error
    }
  }
  async updateUserWft(userId: string, incrementAmt: number, transaction: Transaction): Promise<Boolean> {
    try {

      const [updatedCount] = await User.update(
        { 
          total_water_footprint: sequelize.literal(`total_water_footprint + ${sequelize.escape(incrementAmt)}`)
        },
        { 
          where: { id: userId },
          transaction 
        }
      )

      
      return updatedCount === 1;
    } catch (error) {
      throw error
    }
  }
  async updateProfile(userId: string, name: string | undefined, email: string | undefined, phone_number: string | undefined, photo_url: string | undefined): Promise<Boolean> {
    try {
      const [updatedCount] = await User.update(
        { 
          name: name,
          email: email,
          phone_number: phone_number,
          photo_url: photo_url

        }, 
        { where: { id: userId } }
      )
      return updatedCount == 1
    } catch (error) {
      throw error
    }
  }


  async fetchUserById(id: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          id: id
        }
      });
      if (user == null) {
        throw new NotFoundError(`User Not Found with id: ${id}`, 'USER_NOT_FOUND');
      }
      return user;
    } catch (error) {
      throw error
    }
  }
  async fetchUsers(): Promise<User[]> {
    try {
      return await User.findAll()
    } catch (error) {
      throw error
    }
  }
  

  async updatePassword(email: string, password: string): Promise<Boolean> {
    try {
      const [updatedCount] = await User.update({ password_hash: password }, { where: { email: email } });
      return updatedCount == 1
    } catch (error) {
      throw error
    }
  }

  async insertOtp(email: string, otp: string): Promise<Otp> {
    try {
      const now = new Date()
      const id = uuidv6()
      const otpData = await Otp.create({ id: id, email: email, otp_hash: otp, generated_at: now.getTime() })
      return otpData
    } catch (error) {
      throw error
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
        throw new NotFoundError(`OTP with ${email} doesn't exist`, 'OTP_NOT_FOUND');
        
      }

      return otpRow
    } catch (error) {
      throw error
    }
  }




  async insertUser(userData: RegisterUserData): Promise<User> {

    try {
      const userId = uuidv6();
      const user = await User.create({ id: userId, name: userData.name, email: userData.email, photo_url: "userData.photo_url", password_hash: userData.password_hash, total_water_footprint: 0})
      return user
    } catch (error) {
      throw error
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
        throw new NotFoundError(`User Not Found with email: ${email}`, 'USER_NOT_FOUND');
      }
      return user;
    } catch (error) {

      throw error
    }


  }


}



