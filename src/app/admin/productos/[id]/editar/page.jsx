import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import ProductForm from '@/components/admin/ProductForm';
import { solicitarApi } from '@/lib/api';

async function ContenidoEditarProducto({ params }) {
  // Obtener el ID de la URL.
  const { id } = await params;

  if (
    !/^[1-9]\d*$/.test(id) ||
    !Number.isSafeInteger(Number(id))
  ) {
    notFound();
  }

  // Obtener el JWT desde las cookies del servidor.
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/login');
  }

  // Comprobar los permisos del usuario.
  let usuario;

  try {
    usuario = await solicitarApi('usuario-actual/', {
      token,
    });
  } catch (error) {
    if (error.status === 401) {
      redirect('/login');
    }

    throw error;
  }

  if (usuario.is_staff !== true) {
    redirect('/');
  }

  // Obtener producto y categorías desde Django.
  let producto;
  let respuestaCategorias;

  try {
    [producto, respuestaCategorias] = await Promise.all([
      solicitarApi(`catalogo/productos/${id}/`, { token }),
      solicitarApi('catalogo/categorias/', { token }),
    ]);
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }

    return (
      <p role="alert" className="text-red-600">
        No se pudieron cargar los datos del producto.
      </p>
    );
  }

  const categorias = Array.isArray(respuestaCategorias)
    ? respuestaCategorias
    : respuestaCategorias.results ?? [];

  return (
    <ProductForm
      producto={producto}
      categorias={categorias}
    />
  );
}

export default function EditarProductoPage({ params }) {
  return (
    <Suspense
      fallback={
        <p role="status" className="text-stone-600">
          Cargando producto...
        </p>
      }
    >
      <ContenidoEditarProducto params={params} />
    </Suspense>
  );
}
