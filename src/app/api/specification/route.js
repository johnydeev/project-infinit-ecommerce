import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();
    const { name, url } = body;

    const model = await prisma.model.create({
      data: {
        name,
        url,
      },
    });

    return NextResponse.json(
      { message: "Specification registered successfully", model },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}


export async function GET() {
    console.log("The GETALL function has been called.");
    try {
      const specifications = await prisma.specification.findMany();
      return NextResponse.json(specifications, { status: 200, data: specifications });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error getting specifications" },
        { status: 500 }
      );
    }
  }