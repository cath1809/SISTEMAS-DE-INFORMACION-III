import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, code, password } = await request.json();

    if (!email || !code || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    // 1. Buscar el código e incluir los datos del usuario relacional
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { code },
      include: { user: true }
    });

    // 2. Verificar validez del código y correspondencia con el email
    if (!resetToken || resetToken.user.email !== email) {
      return NextResponse.json({ error: 'El código es incorrecto o no pertenece a este correo' }, { status: 400 });
    }

    // 3. Verificar si expiró
    if (new Date() > resetToken.expiresAt) {
      await prisma.passwordResetToken.delete({ where: { code } });
      return NextResponse.json({ error: 'El código ha expirado' }, { status: 400 });
    }

    // 4. Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Actualizar contraseña y destruir el código usado en una sola transacción
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword }
      }),
      prisma.passwordResetToken.delete({
        where: { code }
      })
    ]);

    return NextResponse.json({ message: 'Contraseña actualizada con éxito.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}