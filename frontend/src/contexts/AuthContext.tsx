import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>(''); // Inicializado com uma string vazia

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
