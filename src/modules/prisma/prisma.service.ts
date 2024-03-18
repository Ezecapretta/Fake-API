import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    console.log("Connecting to database...");
    await prisma.$connect();
    console.log("Connected to database");
    console.clear();
    return prisma;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

export { prisma, disconnectPrisma, connectToDatabase };
