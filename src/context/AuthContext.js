

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const recuperarSesion = async () => {
      try {
        const respuesta = await fetch("/api/auth/session", {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          return;
        }

        const datos = await respuesta.json();

        if (
          !controller.signal.aborted &&
          datos.estaAutenticado &&
          datos.usuario
        ) {
          setUsuario(datos.usuario);
        }
      } catch {
        // Si falla la conexión, no recuperamos la sesión.
      } finally {
        if (!controller.signal.aborted) {
          setCargandoSesion(false);
        }
      }
    };

    recuperarSesion();

    return () => controller.abort();
  }, []);

  const login = (username) => {
    setUsuario(username);
    setCargandoSesion(false);
  };

  const logout = () => {
    setUsuario(null);
  };

  const estaAutenticado = Boolean(usuario);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado,
        cargandoSesion,
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
