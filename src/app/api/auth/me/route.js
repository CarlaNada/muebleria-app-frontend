
import { NextResponse } from "next/server";

export async function GET(request) {
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No hay una sesión activa." },
      { status: 401 }
    );
  }

  try {
    const apiUrl =
      process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { error: "No se configuró el backend." },
        { status: 500 }
      );
    }

    const respuesta = await fetch(`${apiUrl}/api/usuario-actual/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: "No se pudo verificar el usuario." },
        { status: respuesta.status }
      );
    }

    const usuario = await respuesta.json();

    return NextResponse.json(usuario);
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con Django." },
      { status: 503 }
    );
  }
}
