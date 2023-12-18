import { IUser, IUserServerResponse, UserRole } from 'app/types/user';

/* Types export for outside */
/* ==================== START ==================== */

export type TFetchOneUserArgs = {
  id: string;
};
export type TFetchOneUserRes = IUser;

export type TCreateUserArgs = {
  username: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
};
export type TCreateUserRes = IUser;

export type TUpdateUserArgs = {
  id: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
  password?: string;
};
export type TUpdateUserRes = IUser;

export type TDeleteUserArgs = {
  id: string;
};
export type TDeleteUserRes = IUser;
/* ==================== END ==================== */

const mappingServerDataUnderUserView = (serverData: IUserServerResponse): IUser => {
  const userData: IUser = {
    id: serverData.id,
    fullname: serverData.fullname,
    email: serverData.mail,
    phone: serverData.phone,
    role: serverData.role,
    avatar: serverData.avatar,
  };

  return userData;
};

const userAPI = {
  mappingServerDataUnderUserView,
};

export default userAPI;
