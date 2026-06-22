import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function POST(request: Request) {
  try {
    const { email, moduleId, progressPct } = await request.json();

    if (!email || moduleId === undefined || progressPct === undefined) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const isCompleted = progressPct === 100;

    // Upsert: Si el progreso ya existe, lo actualiza. Si no existe, lo crea.
    const savedProgress = await prisma.moduleProgress.upsert({
      where: {
        userId_moduleId: { userId: user.id, moduleId }
      },
      update: { progressPct, isCompleted },
      create: { userId: user.id, moduleId, progressPct, isCompleted }
    });

    return NextResponse.json({ message: 'Progreso guardado', progress: savedProgress });
  } catch (error) {
    console.error('Error guardando progreso:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}


// NUEVO: Función GET para traer todo el progreso del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) return NextResponse.json({ error: 'Falta email' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const allProgress = await prisma.moduleProgress.findMany({
      where: { userId: user.id },
      orderBy: { moduleId: 'asc' } // Ordenamos del módulo 1 al 4
    });

    return NextResponse.json({ progress: allProgress });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}