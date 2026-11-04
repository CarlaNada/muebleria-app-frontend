import { Suspense } from 'react';
import Link from 'next/link';

import ProductForm from '@/components/admin/ProductForm';
import { solicitarApi } from '@/lib/api';

async function ContenidoNuevoProducto() {
  let categorias = [];
  let errorCarga = false;

  try {
    // Obtener categorías activas desde Django.
    const respuesta = await solicitarApi(
      'catalogo/categorias/?activa=true'
    );

    categorias = Array.isArray(respuesta)
      ? respuesta
      : respuesta.results ?? [];

  } catch {
    errorCarga = true;
  }

  // Mostrar error fuera del try/catch.
  if (errorCarga) {
    return (
      <div
        role="alert"
        className="rounded-xl bg-white p-6 shadow-md"
      >
        <p className="text-red-600">
          No se pudieron cargar las categorías desde Django.
        </p>

        <Link
          href="/admin/productos"
          className="mt-4 inline-block text-amber-800 underline"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  // Verificar que existan categorías.
  if (categorias.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <p className="text-amber-800">
          No hay categorías activas disponibles.
          Primero debés crear una categoría en Django.
        </p>

        <Link
          href="/admin/productos"
          className="mt-4 inline-block text-amber-800 underline"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  // Mostrar formulario.
  return <ProductForm categorias={categorias} />;
}

export default function NuevoProductoPage() {
  return (
    <Suspense
      fallback={
        <p role="status" className="text-stone-600">
          Cargando formulario y categorías...
        </p>
      }
    >
      <ContenidoNuevoProducto />
    </Suspense>
  );
}
