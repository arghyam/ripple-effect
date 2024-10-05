import { User } from '../../db_models/User';
import { Otp } from "../../db_models/Otp";
import { RegisterUserData } from '../../../domain/models/RegisterUserData';
import { Transaction } from 'sequelize';

export interface UserDAO {
    
    insertUser(userData: RegisterUserData): Promise<User>

    fetchUserByEmail(email: string): Promise<User>

    fetchUserById(id: string): Promise<User>

    fetchUsers(): Promise<User[]>

    getOtp(email: string, timestamp: number): Promise<Otp>

    insertOtp(email: string, otp: string): Promise<Otp>

    updatePassword(email: string, password: string): Promise<Boolean>

    updateUserWft(
        userId: string,
        incrementAmt: number,
        transaction: Transaction
    ): Promise<Boolean>

    getUserWft(
        userId: string
    ): Promise<number>

    updateProfile(
        userId: string,
        name: string | undefined,
        email: string | undefined,
        phone_number: string | undefined,
        photo_url: string | undefined
    ): Promise<Boolean>
}