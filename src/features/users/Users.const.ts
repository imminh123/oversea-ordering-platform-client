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
    label: 'Đã chặn',
  },
  {
    value: 'false',
    label: 'Đang hoạt động',
  },
];
