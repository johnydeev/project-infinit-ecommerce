import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Método GET by user
export async function GET(request) {
  console.log("get favorite vehicles for user.");
  const urlParts = request.url.split("/");
  const userId = urlParts[urlParts.length - 1];
  try {
    const cars = await prisma.vehicle.findMany({
      where: {
        deleted: false,
        favorites: {
          some: {
            iduser: parseInt(userId)
          }
        }
      },
      include: {
        images: true,
        model: {
          include: {
            brand: true,
          },
        },
        favorites: true
      },
    });

    return NextResponse.json(cars, { status: 200, data: cars });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting vehicles" },
      { status: 500 }
    );
  }
}