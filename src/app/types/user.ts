export enum UserRole {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  User = 'user',
  Client = 'client',
}

export interface IUser {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface IUserServerResponse {
  id: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  role: UserRole;
  wareHouseAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  birthday: string;
  city: string;
  fullname: string;
  province: string;
  ward: string;
  avatar: string;
}
