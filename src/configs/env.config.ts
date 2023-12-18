const nodeEnv = import.meta.env.VITE_NODE_ENV || 'development';
const baseURL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:84';
const defaultPage = import.meta.env.VITE_DEFAULT_PAGE ? parseInt(import.meta.env.VITE_DEFAULT_PAGE) : 1;
const defaultLimit = import.meta.env.VITE_DEFAULT_LIMIT ? parseInt(import.meta.env.VITE_DEFAULT_LIMIT) : 10;
const GG_CLIENT_ID = import.meta.env.VITE_APP_GG_CLIENT_ID;
const VITE_APP_HOST = import.meta.env.VITE_APP_HOST;
const VITE_EXTENSION_KEY = import.meta.env.VITE_EXTENSION_KEY;
const envConfig = {
  nodeEnv,
  baseURL,
  defaultPage,
  defaultLimit,
  GG_CLIENT_ID,
  VITE_APP_HOST,
  VITE_EXTENSION_KEY,
};

export { envConfig };
