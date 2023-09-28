import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, context) {

  try {

    const vehicles = await prisma.vehicle.findMany({
      where: {
        category: {
          AND: [
            {
              name: context.params.name,
            },
            {
              deleted: false,
            },
          ],
        },
      },
      include: {
        category: true,
        model: {
          include: {
            brand: true,
          },
        },
        images: true,
      },
    });


    return NextResponse.json(vehicles, { status: 200, data: vehicles });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: `Error getting vehicles by category name: ${error.message}`,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error getting vehicles by category name" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req,context) {
  console.log("The DELETE function has been called.");
  try {    
    const name = context.params.name

    const category = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });


    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.vehicle.updateMany({
        where: { categoryIdcategory: category.idcategory },
        data: { categoryIdcategory: null },
      }),
      prisma.category.delete({ where: { idcategory: category.idcategory } }),
    ]);

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}