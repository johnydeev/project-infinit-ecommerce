import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('body :>> ', body);

    const user = await prisma.user.findUnique({
      where: { iduser: body.userId },
    });
    if (!user) {
      return NextResponse.json(
          { error: "Usuario inválido seleccionado" },
          { status: 404 }
      );
    }
    const vehicle = await prisma.vehicle.findUnique({
      where: { idvehicle: parseInt(body.vehicleId) },
    });
    if (!vehicle) {
      return NextResponse.json(
          { error: "Vehículo inválido seleccionado" },
          { status: 404 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        user: {
          connect: { iduser: body.userId },
        },
        vehicle: {
          connect: { idvehicle: parseInt(body.vehicleId) },
        },
        checkin_date: body.startDate,
        checkout_date: body.endDate,
      },
    });


    const userEmail = user.email; 
    const emailOptions = {
      from: "noreply@infinit.com",
      to: userEmail,
      subject: "Confirmación de reserva",
      text: `Hola ${userEmail}, tu reserva ha sido confirmada con éxito.`,
      html: `<div style="background-color: #f0f0f0; padding: 20px;">
        <h1 style="color: #333333; font-family: Arial, sans-serif;">Confirmación de reserva</h1>
        <p style="color: #333333; font-family: Arial, sans-serif;">Hola <strong>${userEmail}</strong>, tu reserva ha sido confirmada con éxito.</p>
        <p style="color: #333333; font-family: Arial, sans-serif;">Detalles de la reserva:</p>
        <ul>
          <li>Fecha de check-in: ${formatDate(body.startDate)}</li>
          <li>Fecha de check-out: ${formatDate(body.endDate)}</li>
          <!-- Otros detalles de la reserva aquí -->
        </ul>
        <p style="color: #333333; font-family: Arial, sans-serif;">¡Gracias por elegir INFINIT!</p>
      </div>`,
    };
    
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    
    transporter.sendMail(emailOptions).then(() => {
      console.log("Reservation confirmation email sent");
    }).catch((error) => {
      console.error("Error sending email:", error);
    });

    return NextResponse.json(
      {
        message: "Reserva registrada con éxito",
        reservation,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { Error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}