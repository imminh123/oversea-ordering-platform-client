import { Chip } from '@mui/material';
import { UserRole } from 'app/types/user';

export const mappingBlock = (isBlock: boolean) => {
  switch (isBlock) {
    case false:
      return <Chip label='Hoạt động' color='primary' variant='outlined' />;
    case true:
      return <Chip label='Đã chặn ' color='error' variant='outlined' />;
  }
};

export const mappingRole = (role: UserRole) => {
  switch (role) {
    case UserRole.Root:
      return <Chip label='Root' color='primary' variant='outlined' />;
    case UserRole.Admin:
      return <Chip label='Admin' color='warning' variant='outlined' />;
    case UserRole.Client:
      return <Chip label='Client' color='success' variant='outlined' />;
  }
};
