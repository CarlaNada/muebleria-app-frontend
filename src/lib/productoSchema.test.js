
import { describe, it, expect } from 'vitest';
import { productoSchema } from './productoSchema';

// Producto válido para utilizar como referencia.
const productoValido = {
  nombre: 'Mesa de comedor',
  descripcion: 'Mesa de madera para cuatro personas',
  categoria: 1,
  precio: '50000.00',
  stock: 5,
  imagen_url: '',
  activo: true,
  destacado: false,
};

describe('Validaciones de productos con Zod', () => {

  it('rechaza un producto sin nombre', () => {
    const datos = {
      ...productoValido,
      nombre: '',
    };

    const resultado = productoSchema.safeParse(datos);

    expect(resultado.success).toBe(false);

    expect(
      resultado.error.issues.some(
        (error) => error.path.includes('nombre')
      )
    ).toBe(true);
  });

  it('rechaza un producto con precio negativo', () => {
    const datos = {
      ...productoValido,
      precio: '-5000.00',
    };

    const resultado = productoSchema.safeParse(datos);

    expect(resultado.success).toBe(false);

    expect(
      resultado.error.issues.some(
        (error) => error.path.includes('precio')
      )
    ).toBe(true);
  });

  it('rechaza un producto con stock negativo', () => {
    const datos = {
      ...productoValido,
      stock: -3,
    };

    const resultado = productoSchema.safeParse(datos);

    expect(resultado.success).toBe(false);

    expect(
      resultado.error.issues.some(
        (error) => error.path.includes('stock')
      )
    ).toBe(true);
  });

  it('acepta un producto con todos los datos válidos', () => {
    const resultado = productoSchema.safeParse(
      productoValido
    );

    expect(resultado.success).toBe(true);
  });

});
