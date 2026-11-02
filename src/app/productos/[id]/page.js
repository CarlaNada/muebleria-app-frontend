import Link from 'next/link';
import { notFound } from 'next/navigation';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

function obtenerNombresMateriales(product) {
  if (Array.isArray(product.materiales_nombres)) {
    return product.materiales_nombres;
  }

  if (typeof product.materiales_nombres === 'string') {
    return product.materiales_nombres
      .split(',')
      .map((nombre) => nombre.trim())
      .filter(Boolean);
  }

  return [];
}

export default async function ProductoDetallePage({ params }) {
  const { id } = await params;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error('Falta configurar NEXT_PUBLIC_API_URL.');
  }

  const url = `${apiBaseUrl.replace(/\/+$/, '')}/catalogo/productos/${id}/`;
  const response = await fetch(url, { cache: 'no-store' });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  const product = await response.json();
  const materiales = obtenerNombresMateriales(product);
  const imageStyle = product.imagen_url
    ? { backgroundImage: `url("${product.imagen_url}")` }
    : undefined;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
      <Link
        href="/productos"
        className="text-sm font-medium text-brand hover:text-wood"
      >
        ← Volver al catálogo
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div
          role="img"
          aria-label={`Imagen de ${product.nombre}`}
          className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#e7ded3]"
          style={imageStyle}
        >
          {!product.imagen_url && (
            <div className="flex h-full items-center justify-center font-serif text-6xl text-brand">
              A
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm font-medium text-wood">
            {product.categoria_nombre ?? 'Mueblería Arboleda'}
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-brand sm:text-4xl">
            {product.nombre}
          </h1>

          <p className="mt-5 text-2xl font-semibold text-foreground">
            {formatoPrecio.format(Number(product.precio))}
          </p>

          <p className="mt-6 leading-7 text-muted">
            {product.descripcion || 'Consultá los detalles de este producto.'}
          </p>

          {materiales.length > 0 && (
            <div className="mt-6 border-t border-border pt-5">
              <h2 className="font-semibold text-brand">Materiales</h2>
              <p className="mt-2 text-muted">{materiales.join(', ')}</p>
            </div>
          )}

          <p className="mt-5 text-sm text-muted">
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock disponible'}
          </p>
        </div>
      </section>
    </main>
  );
}