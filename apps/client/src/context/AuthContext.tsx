import {createContext, useEffect, useState, type ReactNode} from "react";
import authStorage from "../services/authStorage.service";
import type {User} from "../types/auth.types";
import authService from "../services/auth.service";
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;

  
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}
 
export function AuthProvider({children}: Props) {

  const [token, setToken] = useState<string | null>(authStorage.getToken());

  const [user, setUser] = useState<User | null>(authStorage.getUser());
 const [isLoading, setIsLoading] = useState(true);
  const login = (jwt: string, currentUser: User) => {
    authStorage.saveToken(jwt);
    authStorage.saveUser(currentUser);

    setToken(jwt);
    setUser(currentUser);
  };

  const logout = () => {
    authStorage.clearSession();

    setToken(null);
    setUser(null);
    setIsLoading(false)
  };
     
useEffect(() => {
  const validateSession = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (error) {
      console.error("Session validation failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  validateSession();
}, [token]);
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
