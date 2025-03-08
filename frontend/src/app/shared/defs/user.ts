export interface UserLoginDto {
    userName: string;
    userPassword: string;
}

export interface UserRegisterDto {
    login: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}