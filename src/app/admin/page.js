
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
          Aquí se integrará la administración de productos
          desarrollada por el equipo.
        </p>
      </div>
    </section>
  );
}
