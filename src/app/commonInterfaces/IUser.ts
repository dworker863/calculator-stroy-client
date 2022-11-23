export interface IUser {
  username: string;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  email?: string | null;
  role?: 'user' | 'admin';
}
