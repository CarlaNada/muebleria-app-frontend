import Link from 'next/link';

export default function AdminPage() {
  return (
    <section className="rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-semibold text-stone-800">
        Bienvenido al panel de administración
      </h2>

      <p className="mt-3 text-stone-600">
        Desde este panel podrás gestionar las funcionalidades
        administrativas de Mueblería Arboleda.
      </p>

      <div className="mt-8 rounded-lg border border-stone-200 p-6">
        <h3 className="text-xl font-semibold text-stone-800">
          Gestión de productos
        </h3>

        <p className="mt-2 text-stone-600">
          Consultá, creá, editá y eliminá los productos
          registrados en la mueblería.
        </p>

        <Link
          href="/admin/productos"
          className="mt-5 inline-block rounded-lg bg-amber-800 px-5 py-3 font-medium text-white transition hover:bg-amber-900"
        >
          Administrar productos
        </Link>
      </div>
    </section>
  );
}
