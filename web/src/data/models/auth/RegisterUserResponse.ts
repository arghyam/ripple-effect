import { UserInfo } from './UserInfo';

export interface RegisterUserResponse {
  status_code: number;
  user_info: UserInfo;
  message: string;
}
