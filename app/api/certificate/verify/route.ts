import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Ej: "NC-30546776"

  if (!id) {
    return NextResponse.json({ error: 'El ID del certificado es requerido' }, { status: 400 });
  }

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId: id }
    });

    if (!certificate) {
      return NextResponse.json({ error: 'Certificado no encontrado o no válido' }, { status: 404 });
    }

    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error('Error al buscar el certificado:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}