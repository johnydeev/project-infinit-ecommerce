import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";;
const prisma = new PrismaClient();


export async function DELETE(request) {
    console.log("Se solicito eliminar un usuario");
    try {
      const body = await request.json();
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { error: "Se debe ingresar un email y una contraseña validos" },
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
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "La contraseña ingresada es incorrecta" },
          { status: 401 }
        );
      }
      await prisma.user.delete({ where: { email } });
      return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { Error: "Error al eliminar el usuario" },
        { status: 500 }
      );
    }
  }
  