import { IUser } from 'app/types/user';
import { createContext, useState } from 'react';

interface AuthState {
  authenticated: boolean;
  errorMessage: string | null;
  user?: IUser | null;
  initialized: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setErrorMessage: (errMsg: string | null) => void;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthState>({
  authenticated: false,
  errorMessage: null,
  initialized: true,
  user: null,
  setAuthenticated: () => {},
  setInitialized: () => {},
  setErrorMessage: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        errorMessage,
        initialized,
        user,
        setAuthenticated,
        setInitialized,
        setErrorMessage,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
