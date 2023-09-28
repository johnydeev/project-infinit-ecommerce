import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();

    /*   if (!plate || !model || !price_per_day || price_per_day <= 0) {
      return NextResponse.json(
        {
          error:
            "You must provide the license plate, model and a valid daily price for the vehicle",
        },
        { status: 400 }
      );
    }
 */

    const brand = await prisma.brand.findUnique({
      where: { name: body.model.brand.name },
    });
    const model = await prisma.model.findUnique({
      where: { name: body.model.name },
    });

    const category = await prisma.category.findUnique({
      where: { name: body.category.name },
    });

    const dealer = await prisma.dealer.findUnique({
      where: {
        iddealer: body.dealer.iddealer,
      },
    });

    const car = await prisma.vehicle.create({
      data: {
        name: `${brand.name} ${model.name} ${body.year}`,
        plate: body.plate,
        model: {
          connect: {
            idmodel: model.idmodel,
            brand: { idbrand: brand.idbrand },
          },
        },
        dealer: {
          connect: {
            iddealer: dealer.iddealer,
          },
        },
        category: {
          connect: { idcategory: category.idcategory },
        },
        detail: body.detail,
        year: body.year,
        price_per_day: body.price_per_day,
        long_description: body.long_description,
        deleted: false,
      },
    });
    await prisma.image.createMany({
      data: body.images.map((url) => ({
        url: url.image,
        deleted: false,
        vehicleIdvehicle: car.idvehicle,
      })),
    });

    return NextResponse.json(
      { message: "Vehicle registered successfully", car },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}

// Método GETALL
export async function GET() {
  console.log("The GETALL VEHICLES function has been called.");
  try {
    const cars = await prisma.vehicle.findMany({
      where: {
        deleted: false,
      },
      include: {
        images: true,
        model: {
          include: {
            brand: true,
          },
        },
        favorites: true,
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
