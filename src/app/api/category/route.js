import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("The POST CATEGORY function has been called.");
  try {
    const body = await request.json();
    const { name,description,url,deleted } = body;

    const data = {
      name,
      description,
      deleted
    }

    if (url != null) {
      data.url = url;
    }

    const brand = await prisma.category.create({
      data
    });

    return NextResponse.json(
      { message: "Category registered successfully", brand },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}

export async function GET() {
  console.log("The GETALL function has been called.");
  try {
    const categories = await prisma.category.findMany({
      where: { deleted: false },
    });
    return NextResponse.json(categories, { status: 200, data: categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting categories" },
      { status: 500 }
    );
  }
}
