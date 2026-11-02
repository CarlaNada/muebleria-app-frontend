
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthControls() {
  const { usuario, estaAutenticado, cargandoSesion, logout } = useAuth();
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
