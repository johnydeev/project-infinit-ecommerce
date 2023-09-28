const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const role = await prisma.role.create({
      data: {
        name: 'Admin',
        // ... other role fields
      },
    });

    const user = await prisma.user.create({
      data: {
        first_name: 'John',
        last_name: 'Doe',
        phone: 1234567890,
        email: 'john@example.com',
        password: 'hashedPassword', // Replace with actual hashed password
        role: {
          connect: { idrole: role.idrole },
        },
      },
    });

    const brand = await prisma.brand.create({
      data: {
        name: 'Brand 1',
        // ... other brand fields
      },
    });

    const model = await prisma.model.create({
      data: {
        name: 'Model 1',
        brand: {
          connect: { idbrand: brand.idbrand },
        },
        // ... other model fields
      },
    });

    const category = await prisma.category.create({
      data: {
        name: 'Category 1',
        // ... other category fields
      },
    });

    const vehicle = await prisma.vehicle.create({
      data: {
        name: 'Vehicle 1',
        plate: 'ABC123',
        detail: 'Some details',
        year: 2023,
        price_per_day: 100.0,
        long_description: 'Long description',
        category: {
          connect: { idcategory: category.idcategory },
        },
        model: {
          connect: { idmodel: model.idmodel },
        },
        // ... other vehicle fields
      },
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
