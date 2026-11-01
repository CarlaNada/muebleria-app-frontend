
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const login = (username, tokens) => {
    setUsuario(username);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
  };

  const logout = () => {
    setUsuario(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const estaAutenticado = Boolean(accessToken);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        accessToken,
        refreshToken,
        estaAutenticado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}
