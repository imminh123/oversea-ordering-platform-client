const nodeEnv = import.meta.env.VITE_NODE_ENV || 'development';
const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || '#0062A9';
const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR || '#4a148c';
const baseURL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:84';
const defaultPage = import.meta.env.VITE_DEFAULT_PAGE ? parseInt(import.meta.env.VITE_DEFAULT_PAGE) : 1;
const defaultLimit = import.meta.env.VITE_DEFAULT_LIMIT ? parseInt(import.meta.env.VITE_DEFAULT_LIMIT) : 10;
const GG_CLIENT_ID = import.meta.env.VITE_APP_GG_CLIENT_ID;
const VITE_APP_HOST = import.meta.env.VITE_APP_HOST;
const envConfig = {
  nodeEnv,
  baseURL,
  primaryColor,
  secondaryColor,
  defaultPage,
  defaultLimit,
  GG_CLIENT_ID,
  VITE_APP_HOST,
};

export { envConfig };
