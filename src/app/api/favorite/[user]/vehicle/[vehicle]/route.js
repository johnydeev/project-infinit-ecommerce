import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

//METODO DELETE
export async function DELETE(request) {
  try {
    const urlParts = request.nextUrl.pathname.split("/");
    const userId = urlParts[3]
    const vehicleId = urlParts[5]

    await prisma.favorite.delete({
      where: {
        iduser_idvehicle: {
          iduser: parseInt(userId),
          idvehicle: parseInt(vehicleId),
        }
      },
    });

    return NextResponse.json(
      { message: "Favorito eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al eliminar el favorito" },
      { status: 500 }
    );
  }
}

// Método POST
export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const urlParts = request.nextUrl.pathname.split("/");
    const userId = urlParts[3]
    const vehicleId = urlParts[5]

    const favorite = await prisma.favorite.create({
      data: {
        iduser: parseInt(userId),
        idvehicle: parseInt(vehicleId),
      },
    });
    return NextResponse.json(
      { message: "Favorite registered successfully", favorite },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}