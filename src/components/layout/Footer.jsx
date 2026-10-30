import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold text-brand">
            Arboleda<span className="text-wood">.</span>
          </Link>
          <p className="mt-1 text-sm text-muted">
            Muebles para acompañar tu hogar.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página" className="flex gap-5 text-sm">
          <Link href="/" className="hover:text-wood">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-wood">
            Productos
          </Link>
        </nav>
      </div>
    </footer>
  );
} 