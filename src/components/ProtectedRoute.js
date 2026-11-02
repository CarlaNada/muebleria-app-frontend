
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  soloAdmin = false,
}) {
  const { usuario, estaAutenticado, cargandoSesion } = useAuth();
  const [adminVerificado, setAdminVerificado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (cargandoSesion) return;

    if (!estaAutenticado) {
      router.replace("/login");
      return;
    }

    if (!soloAdmin) return;

    const controller = new AbortController();

    const verificarAdmin = async () => {
      try {
        const respuesta = await fetch("/api/auth/me", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          if (!controller.signal.aborted) {
            router.replace(
              respuesta.status === 401 ? "/login" : "/"
            );
          }
          return;
        }

        const datos = await respuesta.json();

        if (controller.signal.aborted) return;

        if (datos.is_staff !== true) {
          router.replace("/");
          return;
        }

        setAdminVerificado(datos.username);
      } catch {
        if (!controller.signal.aborted) {
          router.replace("/");
        }
      }
    };

    verificarAdmin();

    return () => controller.abort();
  }, [
    cargandoSesion,
    estaAutenticado,
    soloAdmin,
    router,
  ]);

  if (cargandoSesion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!estaAutenticado) {
    return null;
  }

  if (soloAdmin && adminVerificado !== usuario) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verificando permisos de administrador...</p>
      </div>
    );
  }

  return children;
}
