// Archivo: /app/api/login/route.ts
import { NextResponse } from 'next/server';
// IMPORTANTE: Asegúrate de que esta ruta coincida con tu proyecto (ej. '@/db/prisma' o '@/lib/prisma')
import { prisma } from '@/db/prisma'; 
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Por favor, ingresa correo y contraseña' },
        { status: 400 }
      );
    }

    // 1. Buscar al usuario en la base de datos de Supabase usando Prisma
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // Si el correo no existe en la BD
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 2. Comparar la contraseña escrita con la encriptada en la BD
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 3. Si todo es correcto, quitamos la contraseña por seguridad antes de responder
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Login exitoso', user: userWithoutPassword },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al iniciar sesión' },
      { status: 500 }
    );
  }
}