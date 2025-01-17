import { DayWft } from './DayWft';

export interface GetUserWftProgressResponse {
  queryResult: DayWft[];
  status_code: string;
  message: string;
}
