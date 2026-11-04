import { NextResponse } from 'next/server';
import { solicitarApi } from '@/lib/api';

export async function GET(request) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Debés iniciar sesión.' },
      { status: 401 }
    );
  }

  try {
    // Verificar si el usuario es administrador.
    const usuario = await solicitarApi('usuario-actual/', {
      token,
    });

    if (usuario.is_staff !== true) {
      return NextResponse.json(
        { error: 'No tenés permisos de administrador.' },
        { status: 403 }
      );
    }

    // Consultar los productos de Django.
    const productos = await solicitarApi(
      'catalogo/productos/',
      { token }
    );

    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || 'Error al obtener los productos.',
      },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Debés iniciar sesión.' },
      { status: 401 }
    );
  }

  try {
    // Verificar permisos de administrador.
    const usuario = await solicitarApi('usuario-actual/', {
      token,
    });

    if (usuario.is_staff !== true) {
      return NextResponse.json(
        { error: 'No tenés permisos de administrador.' },
        { status: 403 }
      );
    }

    // Recibir los datos del formulario.
    let datos;

    try {
      datos = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Los datos enviados no son válidos.' },
        { status: 400 }
      );
    }

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
      return NextResponse.json(
        { error: 'El producto debe ser un objeto JSON.' },
        { status: 400 }
      );
    }

    // Crear el producto en Django.
    const producto = await solicitarApi(
      'catalogo/productos/',
      {
        metodo: 'POST',
        token,
        datos,
      }
    );

    return NextResponse.json(producto, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || 'No se pudo crear el producto.',
        detalles: error.detalles || null,
      },
      { status: error.status || 500 }
    );
  }
}
