import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token);

  if (!token) {
    return NextResponse.json({
      message: "no hay sesion",
    }, {
      status: 401,
    })
  }

  try {
    cookieStore.delete("token");

    const response = NextResponse.json(
      {
        message: "sesion cerrada",
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}