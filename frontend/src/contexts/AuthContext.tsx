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
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<JwtData | null>(null);

  const setTokenValue = useCallback((token: string | null) => {
    if (!token) {
      localStorage.removeItem("token");
      setToken(null);
      api.defaults.headers["Authorization"] = "";
      return;
    }

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

export default AuthProvider;



export function useAuth(): [JwtData | null, (token: string | null) => void] {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return [context.token, context.setToken];
}
