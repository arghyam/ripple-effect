export interface RegisterUserData {
    name: string,
    email: string;
    photo_url: string | undefined;
    password_hash: string;
}