
"use client";

import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute soloAdmin>
      <main className="min-h-screen bg-stone-100 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-stone-800">
                Panel de administración
              </h1>

              <p className="mt-2 text-stone-600">
                Gestión de Mueblería Arboleda
              </p>
            </div>

            <Link
              href="/"
              className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
            >
              Volver a la tienda
            </Link>
          </div>

          {children}
        </div>
      </main>
    </ProtectedRoute>
  );
}
