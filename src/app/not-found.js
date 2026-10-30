import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-wood">
        Mueblería Arboleda
      </p>

      <h1 className="mt-4 text-4xl font-semibold text-brand">
        No encontramos esa página
      </h1>

      <p className="mt-3 text-foreground/70">
        Puede que el producto ya no esté disponible o que la dirección sea
        incorrecta.
      </p>

      <Link
        href="/productos"
        className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white"
      >
        Volver al catálogo
      </Link>
    </main>
  );
}