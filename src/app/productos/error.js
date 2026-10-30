'use client';

export default function ErrorProductos({ reset }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-center">
      <h1 className="text-2xl font-semibold text-brand">
        No pudimos cargar el catálogo
      </h1>
      <p className="mt-3 text-muted">
        Revisá que la API esté funcionando e intentá de nuevo.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand px-6 py-3 font-medium text-brand-contrast hover:bg-wood"
      >
        Reintentar
      </button>
    </main>
  );
}