import { fileUploader } from "@/utils/uploadImage";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();

    console.log("body :>> ", body);
    const { name, url } = body;

    const image = fileUploader(url);
    console.log("image :>> ", image);

    const brand = await prisma.brand.create({
      data: {
        name,
        url: image,
      },
    });

    return NextResponse.json(
      { message: "Brand registered successfully", brand },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}

export async function GET() {
  console.log("The GETALL BRANDS function has been called.");
  try {
    const brands = await prisma.brand.findMany({
      include: { models: true },
      where: { deleted: false },
    });
    return NextResponse.json(brands, { status: 200, data: brands });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting brands" },
      { status: 500 }
    );
  }
}
