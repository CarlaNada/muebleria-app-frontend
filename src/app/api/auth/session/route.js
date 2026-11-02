
import { NextResponse } from "next/server";

export async function POST(request) {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const usuario = request.cookies.get("session_username")?.value;

  if (!refreshToken || !usuario) {
    return NextResponse.json(
      { estaAutenticado: false },
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

    const respuesta = await fetch(`${apiUrl}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });

    if (!respuesta.ok) {
      const resultado = NextResponse.json(
        { estaAutenticado: false },
        { status: 401 }
      );

      resultado.cookies.delete("access_token");
      resultado.cookies.delete("refresh_token");
      resultado.cookies.delete("session_username");

      return resultado;
    }

    const tokens = await respuesta.json();

    if (!tokens.access) {
      return NextResponse.json(
        { error: "No se recibió un access token." },
        { status: 502 }
      );
    }

    const resultado = NextResponse.json({
      estaAutenticado: true,
      usuario,
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

    if (tokens.refresh) {
      resultado.cookies.set(
        "refresh_token",
        tokens.refresh,
        opcionesCookie
      );
    }

    return resultado;
  } catch {
    return NextResponse.json(
      { error: "No se pudo recuperar la sesión." },
      { status: 503 }
    );
  }
}
