import Link from 'next/link';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

export default function ProductCard({ product }) {
  const materiales = product.materiales
    ?.map((material) => material.nombre)
    .filter(Boolean)
    .join(' · ');

  const imagenStyle = product.imagen_url
    ? { backgroundImage: `url("${product.imagen_url}")` }
    : undefined;

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-lg">
      <Link href={`/productos/${product.id}`} className="block">
        <div
          role="img"
          aria-label={`Imagen de ${product.nombre}`}
          className="aspect-[4/3] overflow-hidden bg-[#e7ded3]"
        >
          {product.imagen_url ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={imagenStyle}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-brand">
              <span className="font-serif text-4xl">A</span>
              <span className="mt-2 text-xs text-muted">Muebles para tu hogar</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-sm text-wood">
            {product.categoria?.nombre ?? 'Mueble'}
          </p>

          <h2 className="mt-2 text-lg font-semibold text-brand group-hover:text-wood">
            {product.nombre}
          </h2>

          {materiales && (
            <p className="mt-1 text-sm text-muted">{materiales}</p>
          )}

          <p className="mt-4 text-lg font-semibold text-foreground">
            {formatoPrecio.format(Number(product.precio))}
          </p>
        </div>
      </Link>
    </article>
  );
}