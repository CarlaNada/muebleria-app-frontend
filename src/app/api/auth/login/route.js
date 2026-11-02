
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña obligatorios." },
        { status: 400 }
      );
    }

    const apiUrl =
      process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { error: "No se configuró la URL del backend." },
        { status: 500 }
      );
    }

    const respuesta = await fetch(`${apiUrl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!respuesta.ok) {
      return NextResponse.json(
        {
          error:
            respuesta.status === 401
              ? "Usuario o contraseña incorrectos."
              : "No se pudo iniciar sesión.",
        },
        { status: respuesta.status }
      );
    }

    const tokens = await respuesta.json();

    if (!tokens.access || !tokens.refresh) {
      return NextResponse.json(
        { error: "Django no devolvió los tokens JWT." },
        { status: 502 }
      );
    }

    const resultado = NextResponse.json({
      mensaje: "Inicio de sesión correcto.",
      usuario: username,
    });

    const opcionesCookie = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };

    resultado.cookies.set(
      "access_token",
      tokens.access,
      opcionesCookie
    );

    resultado.cookies.set(
      "refresh_token",
      tokens.refresh,
      opcionesCookie
    );

    resultado.cookies.set(
      "session_username",
      username,
      opcionesCookie
    );

    return resultado;
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor." },
      { status: 503 }
    );
  }
}
