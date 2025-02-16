
export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;
export const AUTH_ENDPOINT = `${SERVER_URL}/api/auth`;
export const USER_ENDPOINT = `${SERVER_URL}/api/user`;
export const QUIZ_ENDPOINT = `${SERVER_URL}/api/quiz`;
export const LEADERBOARD_ENDPOINT = `${SERVER_URL}/api/leaderboard`;
