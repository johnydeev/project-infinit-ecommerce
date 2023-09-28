import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
  console.log("La función GET ha sido llamada.");
  try {
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];
    if (!plate) {
      return NextResponse.json(
        { error: "Debes dar la placa del auto" },
        { status: 400 }
      );
    }
    let car;

    //This means it is an ID instead of a plate
    if (parseInt(plate)) {
      car = await prisma.vehicle.findUnique({
        where: {
          idvehicle: parseInt(plate),
        },
        include: {
          dealer: true,
          category: true,
          specifications: true,
          images: true,
          model: {
            include: {
              brand: true,
            },
          },
        },
      });
    } else {
      car = await prisma.vehicle.findUnique({
        where: {
          plate,
        },
        include: {
          dealer: true,
          category: true,
          specifications: true,
          images: true,
          ratings: {
            include: {
              user: true,
            }
          },
          model: {
            include: {
              brand: true,
            },
          },
        },
      });
    }

    if (!car) {
      return NextResponse.json(
        { error: "No se encontró un auto con esa patente" },
        { status: 404 }
      );
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al obtener el auto" },
      { status: 500 }
    );
  }
}
//METODO DELETE
export async function DELETE(request) {
  try {
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];
    if (!plate) {
      return NextResponse.json(
        { error: "Debes proporcionar la placa del auto" },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
      include: {
        images: true,
        specifications: true,
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      );
    }

    await prisma.image.deleteMany({
      where: {
        vehicleIdvehicle: {
          equals: vehicle.idvehicle,
        },
      },
    });

    await prisma.specification.deleteMany({
      where: {
        vehicleIdvehicle: {
          equals: vehicle.idvehicle,
        },
      },
    });

    await prisma.vehicle.delete({
      where: {
        plate,
      },
    });

    return NextResponse.json(
      { message: "Vehículo eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al eliminar el vehículo" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];

    const requestData = await request.json();

    const {
      brand,
      model,
      category,
      specifications,
      images,
      dealer,
      ...otherData
    } = requestData;

    console.log('requestData :>> ', requestData);

    const updatedBrand = brand
      ? { connect: { idbrand: brand.idbrand } }
      : undefined;

    const updatedModel = model
      ? { connect: { idmodel: model.idmodel } }
      : undefined;

    const updatedCategory = category
      ? { connect: { idcategory: category.idcategory } }
      : undefined;

    const updatedSpecifications = specifications
      ? {
          connect: specifications.map((spec) => ({
            idspecification: spec.idspecification,
          })),
        }
      : undefined;

    const updatedImages = images
      ? { create: images.map((img) => ({ url: img.url })) }
      : undefined;

    const updatedDealer = dealer
      ? { connect: { iddealer: dealer.iddealer } }
      : undefined;

    const updatedCar = await prisma.vehicle.update({
      where: {
        plate,
      },
      data: {
        ...otherData,
        brand: updatedBrand,
        model: updatedModel,
        category: updatedCategory,
        specifications: updatedSpecifications,
        images: updatedImages,
        dealer: updatedDealer,
      },
    });

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error when trying to modify the car" },
      { status: 500 }
    );
  }
}
