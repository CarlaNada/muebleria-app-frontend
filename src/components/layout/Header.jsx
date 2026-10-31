import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-brand"
          aria-label="Mueblería Arboleda, inicio"
        >
          Arboleda<span className="text-wood">.</span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-6 text-sm font-medium"
        >
          <Link href="/" className="transition-colors hover:text-wood">
            Inicio
          </Link>
          <Link href="/productos" className="transition-colors hover:text-wood">
            Productos
          </Link>
        </nav>

        <Link
          href="/productos"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-contrast transition-colors hover:bg-wood"
        >
          Ver catálogo
        </Link>
      </div>
    </header>
  );
}