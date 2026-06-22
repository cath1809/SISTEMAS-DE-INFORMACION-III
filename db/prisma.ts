// Archivo: /lib/prisma.ts

// Ahora importamos desde el paquete estándar de node_modules
import { PrismaClient } from '@prisma/client'; 

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma