import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
  console.log("The GET DEALERS BY NAME function has been called.");

  try {
    const { name } = context.params;
    console.log("name :>> ", name);
    if (!name) {
      return NextResponse.json(
        { message: "Delear name is required" },
        { status: 400 }
      );
    }

    const dealers = await prisma.dealer.findMany({
      where: {
        OR: [
          { address: { contains: name } },
          { city: { contains: name } },
          { state: { contains: name } },
          { country: { contains: name } },
        ],
      },
    });

    return NextResponse.json(dealers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting dealers" },
      { status: 500 }
    );
  }
}
