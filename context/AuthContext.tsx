import { createContext, useContext, ReactNode, useState } from 'react';

type userType = {
  id: string;
  username: string;
  email: string;
};

type authContextType = {
  user: userType | null;
  login: (user: userType) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<userType | null>(null);

  const login = (user: userType) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
