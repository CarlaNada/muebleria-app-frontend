
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-wood">
        Mueblería Arboleda
      </p>

      <h1 className="text-4xl font-semibold text-brand">
        Sobre nosotros
      </h1>

      <p className="mt-6 text-lg leading-8 text-muted">
        En Arboleda buscamos combinar diseño, comodidad
        y funcionalidad para crear espacios cálidos
        y acogedores.
      </p>

      <section className="mt-12 rounded-2xl bg-surface p-8">
        <h2 className="text-2xl font-semibold text-brand">
          Nuestra propuesta
        </h2>

        <p className="mt-4 leading-7 text-muted">
          Ofrecemos un catálogo de muebles pensado para
          diferentes ambientes del hogar, con productos
          que combinan estilo y practicidad.
        </p>
      </section>

      <Link
        href="/productos"
        className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-brand-contrast hover:bg-wood"
      >
        Conocer nuestros productos
      </Link>
    </main>
  );
}
