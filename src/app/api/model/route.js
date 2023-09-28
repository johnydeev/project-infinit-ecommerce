import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();
    const { name, brand } = body;

    const model = await prisma.model.create({
      data: {
        name,
        brand,
      },
    });

    return NextResponse.json(
      { message: "Model registered successfully", model },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}


export async function GET() {
    console.log("The GETALL MODELS function has been called.");
    try {
      const models = await prisma.model.findMany();
      return NextResponse.json(models, { status: 200, data: models });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error getting models" },
        { status: 500 }
      );
    }
  }