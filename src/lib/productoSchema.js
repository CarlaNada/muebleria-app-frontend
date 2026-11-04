import { z } from 'zod';

export const productoSchema = z.object({
  nombre: z.string().trim()
    .min(1, 'El nombre es obligatorio.')
    .max(150, 'El nombre no puede superar 150 caracteres.'),

  descripcion: z.string(),

  categoria: z.number().int().positive(
    'Seleccioná una categoría.'
  ),

  precio: z.string().trim().regex(
    /^\d{1,8}(\.\d{1,2})?$/,
    'Ingresá un precio válido. Ejemplo: 50000.00'
  ),

  stock: z.number().int().min(
    0,
    'El stock no puede ser negativo.'
  ),

  imagen_url: z.string().trim().refine((valor) => {
    if (!valor) return true;

    try {
      const url = new URL(valor);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  }, 'Ingresá una URL de imagen válida.'),

  activo: z.boolean(),
  destacado: z.boolean(),
});
