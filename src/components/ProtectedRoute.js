
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { estaAutenticado, cargandoSesion } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargandoSesion && !estaAutenticado) {
      router.replace("/login");
    }
  }, [cargandoSesion, estaAutenticado, router]);

  if (cargandoSesion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-stone-600">
          Verificando sesión...
        </p>
      </div>
    );
  }

  if (!estaAutenticado) {
    return null;
  }

  return children;
}
