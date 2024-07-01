import { User } from '../../../domain/models/User';
import { Otp } from "../../../domain/models/Otp";
import { RegisterUserData } from '../../../domain/models/RegisterUserData';

export interface UserDAO {
    
    insertUser(userData: RegisterUserData): Promise<User>;

    fetchUser(userId: number): Promise<User>;

    fetchUserByEmail(email: string): Promise<User>;

    getOtp(email: string, otp: string): Promise<Otp>;

    insertOtp(email: string, otp: string): Promise<Otp>;

    updatePassword(email: string, password: string): Promise<Boolean>;
}