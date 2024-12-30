import { UserInfo } from './UserInfo';

export interface LoginUserResponse {
  status_code: number;
  access_token: string;
  user_info: UserInfo;
  message: string;
}
