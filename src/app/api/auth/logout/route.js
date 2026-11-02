
import { NextResponse } from "next/server";

export async function POST() {
  const respuesta = NextResponse.json({
    mensaje: "Sesión cerrada correctamente.",
  });

  respuesta.cookies.delete("access_token");
  respuesta.cookies.delete("refresh_token");
  respuesta.cookies.delete("session_username");

  return respuesta;
}
