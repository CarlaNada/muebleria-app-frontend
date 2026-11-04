'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema } from '@/lib/productoSchema';

import FormField from '@/components/FormField';

export default function ProductForm({
  categorias,
  producto = null,
}) {
  const router = useRouter();
  const [errorGeneral, setErrorGeneral] = useState('');
  const esEdicion = Boolean(producto);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: producto?.nombre ?? '',
      descripcion: producto?.descripcion ?? '',
      categoria: Number(producto?.categoria ?? 0),
      precio: producto?.precio ?? '',
      stock: producto?.stock ?? 0,
      imagen_url: producto?.imagen_url ?? '',
      activo: producto?.activo ?? true,
      destacado: producto?.destacado ?? false,
    },
  });

  const guardarProducto = async (datos) => {
    setErrorGeneral('');

    const url = esEdicion
      ? `/api/admin/productos/${producto.id}`
      : '/api/admin/productos';

    try {
      const respuesta = await fetch(url, {
        method: esEdicion ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setErrorGeneral(
          resultado.error || 'No se pudo guardar el producto.'
        );

        // Mostrar errores de validación enviados por Django.
        const detalles = resultado.detalles;

        if (detalles && typeof detalles === 'object') {
          for (const [campo, mensajes] of Object.entries(detalles)) {
            if (Object.hasOwn(productoSchema.shape, campo)) {
              setError(campo, {
                type: 'server',
                message: Array.isArray(mensajes)
                  ? mensajes.join(' ')
                  : String(mensajes),
              });
            }
          }
        }

        return;
      }

      router.push('/admin/productos');
      router.refresh();
    } catch {
      setErrorGeneral('No se pudo conectar con el servidor.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(guardarProducto)}
      className="space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="text-2xl font-bold text-stone-800">
        {esEdicion ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <FormField
        label="Nombre"
        name="nombre"
        placeholder="Ej.: Mesa de comedor"
        registration={register('nombre')}
        error={errors.nombre}
      />

      <div>
        <label
          htmlFor="descripcion"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          rows={3}
          {...register('descripcion')}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800"
        />
      </div>

      <div>
        <label
          htmlFor="categoria"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Categoría
        </label>

        <select
          id="categoria"
          {...register('categoria', { valueAsNumber: true })}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800"
        >
          <option value={0}>Seleccionar categoría</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        {errors.categoria && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {errors.categoria.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Precio ($)"
          name="precio"
          placeholder="Ej.: 50000.00"
          registration={register('precio')}
          error={errors.precio}
        />

        <FormField
          label="Stock"
          name="stock"
          type="number"
          registration={{
            ...register('stock', { valueAsNumber: true }),
            min: 0,
            step: 1,
          }}
          error={errors.stock}
        />
      </div>

      <FormField
        label="URL de imagen (opcional)"
        name="imagen_url"
        placeholder="https://ejemplo.com/mesa.jpg"
        registration={register('imagen_url')}
        error={errors.imagen_url}
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-stone-700">
          <input
            type="checkbox"
            {...register('activo')}
          />
          Producto activo
        </label>

        <label className="flex items-center gap-2 text-stone-700">
          <input
            type="checkbox"
            {...register('destacado')}
          />
          Producto destacado
        </label>
      </div>

      {errorGeneral && (
        <p role="alert" className="text-sm text-red-600">
          {errorGeneral}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg bg-amber-800 px-6 py-3 font-semibold text-white hover:bg-amber-900 disabled:opacity-60"
        >
          {isSubmitting
            ? 'Guardando...'
            : esEdicion
              ? 'Guardar cambios'
              : 'Crear producto'}
        </button>

        <Link
          href="/admin/productos"
          className="rounded-lg border border-stone-300 px-6 py-3 text-stone-700 hover:bg-stone-100"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
