// Archivo: /app/api/users/role/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, newRole } = body;

    // 1. Validar que lleguen los datos requeridos
    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (userId o newRole)' },
        { status: 400 }
      );
    }

    // 2. Validar que el nuevo rol sea válido según tu Enum en Prisma
    if (newRole !== 'USER' && newRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'El rol proporcionado no es válido' },
        { status: 400 }
      );
    }

    // 3. Actualizar el usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: { 
        id: userId 
      },
      data: { 
        role: newRole 
      },
      // Solo devolvemos los datos esenciales como confirmación
      select: {
        id: true,
        name: true,
        role: true,
      }
    });

    return NextResponse.json(
      { message: 'Rol actualizado con éxito', user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al intentar cambiar el rol' },
      { status: 500 }
    );
  }
}