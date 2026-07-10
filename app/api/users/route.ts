// Archivo: /app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma'; 

export async function GET() {
  try {
    // Buscamos todos los usuarios, ordenados por fecha de creación (los más recientes primero)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cedula: true,
        role: true,
        createdAt: true,
        // Excluimos explícitamente 'password' al no incluirlo en el select
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users }, { status: 200 });
    
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al cargar los usuarios' },
      { status: 500 }
    );
  }
}