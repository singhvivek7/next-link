import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const client = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Store globally in both dev and production to ensure singleton
if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = client;
}

export default client;
