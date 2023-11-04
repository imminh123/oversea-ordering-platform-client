import { envConfig } from './env.config';

const ROWS_PER_PAGE_OPTIONS = [1, 2, 3, 4, 5].map((it) => it * envConfig.defaultLimit);

export const paginationConfig = {
  ROWS_PER_PAGE_OPTIONS,
};
