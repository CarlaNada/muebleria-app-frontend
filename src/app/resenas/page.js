
const resenas = [
  {
    id: 1,
    nombre: 'Rodrigo',
    puntuacion: 5,
    comentario: 'Los muebles tienen un diseño muy lindo y combinan con diferentes espacios.',
  },
  {
    id: 2,
    nombre: 'Carla',
    puntuacion: 4,
    comentario: 'Me gustó la variedad de productos y la facilidad para encontrar lo que buscaba.',
  },
  {
    id: 3,
    nombre: 'Santino',
    puntuacion: 5,
    comentario: 'Una propuesta interesante para amueblar distintos ambientes del hogar.',
  },
];

export default function ResenasPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-wood">
        Mueblería Arboleda
      </p>

      <h1 className="text-4xl font-semibold text-brand">
        Reseñas
      </h1>

      <p className="mt-5 text-lg text-muted">
        Conocé las opiniones sobre nuestros productos.
      </p>

      <p className="mt-3 text-sm text-muted">
        Reseñas de ejemplo utilizadas para demostrar
        el diseño de la aplicación.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {resenas.map((resena) => (
          <article
            key={resena.id}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <div
              className="mb-4 text-xl text-amber-600"
              aria-label={`${resena.puntuacion} de 5 estrellas`}
            >
              {'★'.repeat(resena.puntuacion)}
              {'☆'.repeat(5 - resena.puntuacion)}
            </div>

            <h2 className="text-lg font-semibold text-brand">
              {resena.nombre}
            </h2>

            <p className="mt-3 leading-7 text-muted">
              {resena.comentario}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
