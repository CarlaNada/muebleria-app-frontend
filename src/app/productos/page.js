import Link from 'next/link';
import ProductGrid from '@/components/products/ProductGrid';

const ordenamientosPermitidos = new Set([
  'nombre',
  '-nombre',
  'precio',
  '-precio',
]);

function primerValor(value) {
  return Array.isArray(value) ? value[0] : value;
}

function crearEnlacePagina(search, ordering, page) {
  const params = new URLSearchParams();

  if (search) params.set('search', search);
  if (ordering !== 'nombre') params.set('ordering', ordering);
  params.set('page', String(page));

  return `/productos?${params.toString()}`;
}

export default async function ProductosPage({ searchParams }) {
  const params = await searchParams;
  const search = (primerValor(params.search) ?? '').trim();

  const orderingSolicitado = primerValor(params.ordering) ?? 'nombre';
  const ordering = ordenamientosPermitidos.has(orderingSolicitado)
    ? orderingSolicitado
    : 'nombre';

  const pageSolicitada = Number.parseInt(
    primerValor(params.page) ?? '1',
    10
  );
  const page = Number.isInteger(pageSolicitada) && pageSolicitada > 0
    ? pageSolicitada
    : 1;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error('Falta configurar NEXT_PUBLIC_API_URL.');
  }

  const url = new URL(
    `${apiBaseUrl.replace(/\/+$/, '')}/catalogo/productos/`
  );

  if (search) url.searchParams.set('search', search);
  url.searchParams.set('ordering', ordering);
  url.searchParams.set('page', String(page));

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  const data = await response.json();
  const products = data.results ?? [];
  const total = data.count ?? products.length;
  const totalPages = Math.max(1, Math.ceil(total / 10));

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wood">
          Mueblería Arboleda
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-brand sm:text-4xl">
          Nuestros productos
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Explorá el catálogo y encontrá muebles para tus espacios.
        </p>
      </header>

      <form
        action="/productos"
        method="get"
        className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row"
      >
        <label className="sr-only" htmlFor="search">
          Buscar productos
        </label>
        <input
          id="search"
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Buscar por nombre, categoría o material"
          className="min-h-12 flex-1 rounded-xl border border-border bg-background px-4 outline-none focus:border-brand"
        />

        <label className="sr-only" htmlFor="ordering">
          Ordenar productos
        </label>
        <select
          id="ordering"
          name="ordering"
          defaultValue={ordering}
          className="min-h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:border-brand"
        >
          <option value="nombre">Nombre: A a Z</option>
          <option value="-nombre">Nombre: Z a A</option>
          <option value="precio">Precio: menor a mayor</option>
          <option value="-precio">Precio: mayor a menor</option>
        </select>

        <button
          type="submit"
          className="min-h-12 rounded-xl bg-brand px-6 font-medium text-brand-contrast transition-colors hover:bg-wood"
        >
          Buscar
        </button>
      </form>

      <p className="mb-5 text-sm text-muted" aria-live="polite">
        {total} productos encontrados
      </p>

      <ProductGrid products={products} />

      {total > 10 && (
        <nav
          aria-label="Paginación del catálogo"
          className="mt-10 flex items-center justify-center gap-5"
        >
          {data.previous && (
            <Link
              href={crearEnlacePagina(search, ordering, page - 1)}
              className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-brand hover:bg-background"
            >
              Anterior
            </Link>
          )}

          <span className="text-sm text-muted">
            Página {page} de {totalPages}
          </span>

          {data.next && (
            <Link
              href={crearEnlacePagina(search, ordering, page + 1)}
              className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-brand hover:bg-background"
            >
              Siguiente
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}