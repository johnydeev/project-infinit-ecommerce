import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";;
const prisma = new PrismaClient();



export async function GET(request) {
  console.log("Se solicito la informacion del usuario");
  try {
    console.log(request);
    const urlParts = request.url.split("/");
    const email = urlParts[urlParts.length - 1];
    if (!email) {
      return NextResponse.json(
        { error: "Se debe ingresar un email valido" },
        { status: 400 }
      );
    }
    const userRegister = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        address: true,
        identification: true,
        city: true,
        country: true,
        zip_code: true,
      },
    });
    if (!userRegister) {
      return NextResponse.json(
        { error: "No se encontro un usuario con ese email" },
        { status: 404 }
      );
    }
    return NextResponse.json(userRegister, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { Error: "Error al obtener datos del usuario" },
      { status: 500 }
    );
  }
}


export async function PUT(request) {
  console.log("Se solicito actualizar la informacion del usuario");
  try {
    const body = await request.json();
    const urlParts = request.url.split("/");
    const email = urlParts[urlParts.length - 1];
    if (!email) {
      return NextResponse.json(
        { error: "Se debe ingresar un email valido" },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json(
        { error: "No se encontro un usuario con ese email" },
        { status: 404 }
      );
    }
    const { country, city, zipCode, street } = body.address;
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        first_name: body.firstName,
        last_name: body.lastName,
        phone: parseInt(body.phone),
        address: street,
        country,
        city,
        zip_code: parseInt(zipCode),
        identification: body.identification,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { Error: "Error al actualizar datos del usuario" },
      { status: 500 }
    );
  }
}



