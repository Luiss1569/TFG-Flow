import { PrismaClient } from "@prisma/client";

export function connect() {
  return new PrismaClient();
}

export function createPrismaClientWithLogger() {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
}

export function disconnect(prisma: PrismaClient) {
  return prisma.$disconnect();
}
