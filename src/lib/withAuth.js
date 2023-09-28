import {NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function withAuth(handler) {
  return async (request, response) => {
    // Obtener el token de la cookie
    const token = request.cookies.token;

    // Verificar si el token es válido
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin) {
        return handler(request, response);
      } else {
        return NextResponse.unauthorized();
      }
    } catch (error) {
      return NextResponse.unauthorized();
    }
  };
}
