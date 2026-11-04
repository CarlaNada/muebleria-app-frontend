
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthControls() {
  const { usuario, estaAutenticado, cargandoSesion, logout } = useAuth();
  const [adminVerificado, setAdminVerificado] = useState(null);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Verificar si el usuario autenticado es administrador.
  useEffect(() => {
    if (cargandoSesion || !estaAutenticado || !usuario) return;

    const controller = new AbortController();

    const verificarAdministrador = async () => {
      try {
        const respuesta = await fetch("/api/auth/me", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          if (!controller.signal.aborted) {
            setAdminVerificado(null);
          }
          return;
        }

        const datos = await respuesta.json();

        if (!controller.signal.aborted) {
          setAdminVerificado(
            datos.is_staff === true ? datos.username : null
          );
        }
      } catch {
        if (!controller.signal.aborted) {
          setAdminVerificado(null);
        }
      }
    };

    verificarAdministrador();

    return () => controller.abort();
  }, [cargandoSesion, estaAutenticado, usuario]);

  const cerrarSesion = async () => {
    setError("");
    setCerrandoSesion(true);

    try {
      const respuesta = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!respuesta.ok) {
        throw new Error("Error al cerrar sesión");
      }

      logout();
      setAdminVerificado(null);

      router.replace("/login");
      router.refresh();
    } catch {
      setError("No se pudo cerrar la sesión.");
    } finally {
      setCerrandoSesion(false);
    }
  };

  if (cargandoSesion) {
    return <span className="text-sm text-stone-500">Verificando sesión...</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {estaAutenticado ? (
        <>
          <span className="text-sm text-stone-800">
            Hola, <strong>{usuario}</strong>
          </span>

          {/* Mostrar solamente a administradores */}
          {adminVerificado === usuario && (
            <Link
              href="/admin"
              className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900"
            >
              Panel admin
            </Link>
          )}

          <button
            type="button"
            onClick={cerrarSesion}
            disabled={cerrandoSesion}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
          >
            {cerrandoSesion ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="rounded-lg bg-amber-800 px-4 py-2 text-sm text-white hover:bg-amber-900"
        >
          Iniciar sesión
        </Link>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
