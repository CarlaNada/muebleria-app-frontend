
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export default function LoginPage() {
  const [mensaje, setMensaje] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = () => {
    // La conexión con Django se implementará en el siguiente paso.
    setMensaje("Formulario válido. Falta conectar con la API.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-800">
            Mueblería Arboleda
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Ingresá con tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Usuario
            </label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Ingresá tu usuario"
              aria-invalid={Boolean(errors.username)}
              {...register("username")}
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 outline-none focus:border-amber-700"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 outline-none focus:border-amber-700"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-amber-800 py-3 font-semibold text-white transition hover:bg-amber-900"
          >
            Iniciar sesión
          </button>

          {mensaje && (
            <p role="status" className="text-center text-sm text-green-700">
              {mensaje}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
