import Link from 'next/link';

const beneficios = [
  {
    numero: '01',
    titulo: 'Diseño funcional',
    descripcion: 'Piezas pensadas para acompañar tus espacios y tu día a día.',
  },
  {
    numero: '02',
    titulo: 'Estilo natural',
    descripcion: 'Tonos cálidos y materiales que aportan personalidad al hogar.',
  },
  {
    numero: '03',
    titulo: 'Elegí a tu ritmo',
    descripcion: 'Explorá el catálogo y encontrá el mueble que estás buscando.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Mueblería Arboleda
          </p>

          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-brand sm:text-5xl lg:text-6xl">
            Un hogar se construye con buenas historias.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            Descubrí muebles que combinan calidez, diseño y funcionalidad para
            hacer tuyos cada uno de tus espacios.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="rounded-full bg-brand px-6 py-3 font-medium text-brand-contrast transition-colors hover:bg-wood"
            >
              Explorar productos
            </Link>

            <Link
              href="#nuestra-esencia"
              className="rounded-full border border-border px-6 py-3 font-medium text-brand transition-colors hover:bg-surface"
            >
              Conocé Arboleda
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[#e7ded3] sm:min-h-[430px]"
        >
          <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full bg-background/70" />

          <div className="absolute bottom-28 right-12 h-44 w-60 rounded-t-[5rem] bg-brand shadow-xl sm:right-20" />
          <div className="absolute bottom-16 right-5 h-20 w-72 rounded-3xl bg-wood shadow-lg sm:right-12 sm:w-80" />

          <div className="absolute bottom-0 right-16 h-16 w-3 rounded-b bg-foreground/70 sm:right-24" />
          <div className="absolute bottom-0 right-60 h-16 w-3 rounded-b bg-foreground/70 sm:right-64" />

          <div className="absolute bottom-5 left-5 max-w-52 rounded-2xl bg-surface p-4 shadow-md sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-wood">
              Colección Arboleda
            </p>
            <p className="mt-1 font-medium text-brand">
              Calidez para todos tus espacios
            </p>
          </div>
        </div>
      </section>

      <section id="nuestra-esencia" className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Nuestra esencia
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Diseñamos pensando en cómo vivís tus espacios.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {beneficios.map((beneficio) => (
              <article key={beneficio.numero} className="border-t border-border pt-5">
                <p className="text-sm font-semibold text-wood">
                  {beneficio.numero}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-brand">
                  {beneficio.titulo}
                </h3>
                <p className="mt-2 leading-7 text-muted">
                  {beneficio.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}