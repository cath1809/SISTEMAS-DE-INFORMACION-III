// Archivo: /app/api/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma'; // Ajusta la ruta si no usas el alias '@' (ej. '../../../lib/prisma')
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // 1. Extraer los datos que envía tu formulario
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Validación básica de que no vengan vacíos
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (nombre, email o contraseña)' },
        { status: 400 }
      );
    }

    // 3. Verificar si el correo ya existe en Supabase
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este correo electrónico ya está registrado' },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Crear el usuario en la base de datos usando Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 6. Por seguridad, quitamos la contraseña antes de devolver la respuesta exitosa
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: 'Usuario creado con éxito', user: userWithoutPassword },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error interno al crear el usuario' },
      { status: 500 }
    );
  }
}