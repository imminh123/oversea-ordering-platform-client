export enum UserRole {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  User = 'user',
}

export interface IUser {
  id: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}

export interface IUserServerResponse {
  id: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}
