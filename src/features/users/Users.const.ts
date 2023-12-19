import { UserRole } from 'app/types/user';

export const UserRoleOptions: { value: UserRole; label: string }[] = [
  {
    value: UserRole.Admin,
    label: 'Admin',
  },
  {
    value: UserRole.Root,
    label: 'root',
  },
  {
    value: UserRole.Client,
    label: 'Client',
  },
];

export const UserStatusOptions: { value: string; label: string }[] = [
  {
    value: 'true',
    label: 'Hoạt động',
  },
  {
    value: 'false',
    label: 'Chưa kích hoạt',
  },
];
