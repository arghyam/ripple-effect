import { User } from '../../db_models/User';
import { Otp } from "../../db_models/Otp";
import { RegisterUserData } from '../../../domain/models/RegisterUserData';

export interface UserDAO {
    
    insertUser(userData: RegisterUserData): Promise<User>;

    fetchUserByEmail(email: string): Promise<User>;

    getOtp(email: string, timestamp: number): Promise<Otp>;

    insertOtp(email: string, otp: string): Promise<Otp>;

    updatePassword(email: string, password: string): Promise<Boolean>;
}