
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, context) {
  console.log("The GET function has been called.");

  console.log(context.params);
  const id = parseInt(context.params.id); 

  try {
    
    const reservations = await prisma.reservation.findMany({
      where: { userIduser: id }, 
      include: {
        user: true,
        vehicle: true,
      },
      
    }
    );

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error(error);


    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}




  
  