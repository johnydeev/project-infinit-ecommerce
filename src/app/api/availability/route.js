// import { fileUploader } from "@/utils/uploadImage";
import { PrismaClient } from "@prisma/client";
import { message } from "antd";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
    
    try {
        // traigo la info de la base de datos
        const availability = await prisma.reservation.findMany({
            // where:{vehicleIdvehicle : 1} 
        });

        // aca traigo las fechas en que el auto se reserva
        const entryDates = availability.map(item => ({            
            start: item.checkin_date,
            end: item.checkout_date
        }));
        
        
        console.log("el metodo Get se esta ejecutando");
        return NextResponse.json( entryDates,{ status: 200, message: "Todo está OK" });
    } catch (error) {
      // En caso de que ocurra un error, registra el error en la consola y responde con un código de estado 500 y un mensaje de error
        console.error("Error fetching availability: ", error);
        return NextResponse.json({ error: "Unable to fetch availability" },{status:500});
        }
    }


































// export async function GET() {
// }

// export default async function handler(req) {
//     if (req.method === "GET") {
//     try {
//       // Consulta la disponibilidad de vehículos en tu base de datos utilizando Prisma
//         const vehicles = await prisma.vehicle.findMany({
//         include: {
//           availabilityPeriod: true, // Incluye los períodos de disponibilidad
//         },
//         });

//       // Procesa los datos para obtener las fechas disponibles y ocupadas
//         const availableDates = [];
//         const occupiedDates = [];

//         for (const vehicle of vehicles) {
//             for (const period of vehicle.availabilityPeriod) {
//                 const startDate = new Date(period.startDate);
//                 const endDate = new Date(period.endDate);

//             // Agrega las fechas al arreglo correspondiente (disponibles u ocupadas)
//                 const currentDate = new Date(startDate);
//                 while (currentDate <= endDate) {
//                 if (!occupiedDates.includes(currentDate.toISOString())) {
//                     availableDates.push(currentDate.toISOString());
//                 }
//                 currentDate.setDate(currentDate.getDate() + 1);
//                 }
//             }
//         }

//         return NextResponse.json({ availableDates, occupiedDates });
//     } catch (error) {
//         console.error("Error fetching availability: ", error);
//         return NextResponse.json({ error: "Unable to fetch availability" });
//         }
//     } else {
//         return NextResponse.json({ error: "Method not allowed" });
//     }
// }