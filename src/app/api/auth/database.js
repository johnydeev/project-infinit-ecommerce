import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
  // Buscar un usuario con la dirección de correo electrónico especificada
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
