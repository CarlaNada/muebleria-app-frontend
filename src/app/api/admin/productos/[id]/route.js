import { NextResponse } from 'next/server';
import { solicitarApi } from '@/lib/api';

async function verificarAdministrador(request) {
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return {
      respuesta: NextResponse.json(
        { error: 'Debés iniciar sesión.' },
        { status: 401 }
      ),
    };
  }

  const usuario = await solicitarApi('usuario-actual/', {
    token,
  });

  if (usuario.is_staff !== true) {
    return {
      respuesta: NextResponse.json(
        { error: 'No tenés permisos de administrador.' },
        { status: 403 }
      ),
    };
  }

  return { token };
}

function responderError(error) {
  return NextResponse.json(
    {
      error: error.message || 'Ocurrió un error.',
      detalles: error.detalles ?? null,
    },
    { status: error.status || 500 }
  );
}

function idValido(id) {
  return /^\d+$/.test(id) &&
    Number.isSafeInteger(Number(id)) &&
    Number(id) > 0;
}

// Consultar un producto por su ID.
export async function GET(request, { params }) {
  try {
    const { token, respuesta } = await verificarAdministrador(request);

    if (respuesta) return respuesta;

    const { id } = await params;

    if (!idValido(id)) {
      return NextResponse.json(
        { error: 'ID de producto inválido.' },
        { status: 400 }
      );
    }

    const producto = await solicitarApi(
      `catalogo/productos/${id}/`,
      { token }
    );

    return NextResponse.json(producto);
  } catch (error) {
    return responderError(error);
  }
}

// Actualizar un producto existente.
export async function PATCH(request, { params }) {
  try {
    const { token, respuesta } = await verificarAdministrador(request);

    if (respuesta) return respuesta;

    const { id } = await params;

    if (!idValido(id)) {
      return NextResponse.json(
        { error: 'ID de producto inválido.' },
        { status: 400 }
      );
    }

    let datos;

    try {
      datos = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'El JSON enviado no es válido.' },
        { status: 400 }
      );
    }

    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
      return NextResponse.json(
        { error: 'Los datos del producto no son válidos.' },
        { status: 400 }
      );
    }

    const producto = await solicitarApi(
      `catalogo/productos/${id}/`,
      {
        metodo: 'PATCH',
        token,
        datos,
      }
    );

    return NextResponse.json(producto);
  } catch (error) {
    return responderError(error);
  }
}


export async function DELETE(request, { params }) {
  try {
    // Verificar que el usuario sea administrador.
    const { token, respuesta } = await verificarAdministrador(request);

    if (respuesta) return respuesta;

    const { id } = await params;

    if (!idValido(id)) {
      return NextResponse.json(
        { error: 'ID de producto inválido.' },
        { status: 400 }
      );
    }

    // Eliminar el producto en Django.
    await solicitarApi(
      `catalogo/productos/${id}/`,
      {
        metodo: 'DELETE',
        token,
      }
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return responderError(error);
  }
}
