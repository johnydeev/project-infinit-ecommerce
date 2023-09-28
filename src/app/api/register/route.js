import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
  const body = await request.json();

  const {
    email,
    password,
  } = body;

  console.log("body", body);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      {
        message: "There is already a user with that email",
      },
      {
        status: 400,
      }
    );
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connect: { idrole: 2 },
        },
        deleted: false,
      },
    });


    const emailOptions = {
      from: "noreply@infinit.com",
      to: email,
      subject: "Confirmación de registro",
      text: `Hola ${email}, gracias por registrarte en INFINIT. Por favor, haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico.`,
      html: `<div style="background-color: #f0f0f0; padding: 20px;">
        <h1 style="color: #333333; font-family: Arial, sans-serif;">Bienvenido/a a INFINIT</h1>
        <p style="color: #333333; font-family: Arial, sans-serif;">Hola <strong>${email}</strong>, gracias por registrarte en INFINIT. Estamos encantados de tenerte con nosotros.</p>
        <p style="color: #333333; font-family: Arial, sans-serif;">Para completar tu registro, solo tienes que hacer clic en el siguiente botón y confirmar tu dirección de correo electrónico.</p>
        <a href="#" style="display: inline-block; background-color: #0078d4; color: white; padding: 10px 20px; text-decoration: none; font-family: Arial, sans-serif;">Confirmar correo electrónico</a>
        <p style="color: #333333; font-family: Arial, sans-serif;">Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.</p>
        <p style="color: #333333; font-family: Arial, sans-serif;">¡Gracias por elegir INFINIT!</p>
      </div>`,
    };
    

    try {
      await transporter.sendMail(emailOptions);
      console.log("Registration confirmation email sent");
    } catch (error) {
      console.error("Error sending registration confirmation email:", error);
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    });
  }
}