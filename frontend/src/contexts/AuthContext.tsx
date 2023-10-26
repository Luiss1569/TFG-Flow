import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import JwtData from "../interfaces/JwtData";
import jwtDecode from "jwt-decode";
import api from "../lib/axios";

interface AuthContextType {
  token: JwtData | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<JwtData | null>(null);

  const setTokenValue = useCallback((token: string) => {
    const decodedToken = jwtDecode(token);

    localStorage.setItem("token", token);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setToken(decodedToken as JwtData);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenValue(token);
    }
  }, [setTokenValue]);

  const providerValue = useMemo(
    () => ({ token, setToken: setTokenValue }),
    [token, setTokenValue]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
