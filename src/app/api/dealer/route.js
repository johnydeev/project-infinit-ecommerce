import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { message: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        dealer: {
          city: { equals: body.city },
        },
        deleted: false,
        reservation: {
          none: {
            AND: [
              { checkout_date: { gte: new Date(startDate) } },
              { checkin_date: { lte: new Date(endDate) } },
            ],
          },
        },
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

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting vehicles" },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("The GETALL function has been called.");
  try {
    const dealers = await prisma.dealer.findMany();
    return NextResponse.json(dealers, { status: 200, data: dealers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting dealers" },
      { status: 500 }
    );
  }
}
