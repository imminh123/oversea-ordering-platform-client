const storagePrefixClient = 'bulletproof_react_client_';

const storage = {
  getAccessTokenClient: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefixClient}_access_token`) as string);
  },
  getRefreshTokenClient: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefixClient}_refresh_token`) as string);
  },
  setAccessTokenClient: (token: string) => {
    window.localStorage.setItem(`${storagePrefixClient}_access_token`, JSON.stringify(token));
  },
  setRefreshTokenClient: (token: string) => {
    window.localStorage.setItem(`${storagePrefixClient}_refresh_token`, JSON.stringify(token));
  },
  clearTokensClient: () => {
    window.localStorage.removeItem(`${storagePrefixClient}_access_token`);
    window.localStorage.removeItem(`${storagePrefixClient}_refresh_token`);
  },
};

export default storage;
