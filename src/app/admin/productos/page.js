'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProductosPage() {
  const [productos, setProductos] = useState([]);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [errorEliminar, setErrorEliminar] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const respuesta = await fetch('/api/admin/productos', {
          cache: 'no-store',
          signal: controller.signal,
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(
            datos.error || 'No se pudieron cargar los productos.'
          );
        }

        if (!controller.signal.aborted) {
          setProductos(datos.results ?? []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => controller.abort();
  }, []);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(Number(precio));
  };

  const eliminarProducto = async (producto) => {
    const confirmado = window.confirm(
      `¿Estás seguro de que querés eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`
    );

    if (!confirmado) return;

    setErrorEliminar('');
    setEliminandoId(producto.id);

    try {
      const respuesta = await fetch(
        `/api/admin/productos/${producto.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!respuesta.ok) {
        const datos = await respuesta.json().catch(() => ({}));

        throw new Error(
          datos.error || 'No se pudo eliminar el producto.'
        );
      }

      // Actualizar el listado sin recargar la página.
      setProductos((anteriores) =>
        anteriores.filter((item) => item.id !== producto.id)
      );
    } catch (error) {
      setErrorEliminar(error.message);
    } finally {
      setEliminandoId(null);
    }
  };

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        {error}
      </p>
    );
  }


  return (
    <section className="rounded-xl bg-white p-6 shadow-md">   
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">
            Administración de productos
          </h2>

          <p className="mt-2 text-stone-600">
            Consultá y administrá los productos de la mueblería.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin"
            className="rounded-lg border border-stone-300 px-5 py-3 font-medium text-stone-700 hover:bg-stone-100"
          >
            Volver al panel
          </Link>

          <Link
            href="/admin/productos/nuevo"
            className="rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white hover:bg-amber-900"
          >
            + Nuevo producto
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-stone-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id}
                className="border-b border-stone-200"
              >
                <td className="p-3 font-medium">
                  {producto.nombre}
                </td>

                <td className="p-3">
                  {producto.categoria?.nombre ?? 'Sin categoría'}
                </td>

                <td className="p-3">
                  {formatearPrecio(producto.precio)}
                </td>

                <td className="p-3">
                  {producto.stock}
                </td>

                <td className="p-3">
                  <span
                    className={
                      producto.activo
                        ? 'font-medium text-green-700'
                        : 'font-medium text-red-600'
                    }
                  >
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/productos/${producto.id}`}
                      className="font-medium text-stone-700 hover:underline"
                    >
                      Ver
                    </Link>

                    <Link
                      href={`/admin/productos/${producto.id}/editar`}
                      className="font-medium text-amber-800 hover:underline"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => eliminarProducto(producto)}
                      disabled={eliminandoId !== null}
                      className="cursor-pointer font-medium text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {eliminandoId === producto.id
                        ? 'Eliminando...'
                        : 'Eliminar'}
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {errorEliminar && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {errorEliminar}
          </p>
        )}

        {productos.length === 0 && (
          <p className="py-6 text-center text-stone-500">
            No hay productos registrados.
          </p>
        )}
      </div>
    </section>
  );
}
