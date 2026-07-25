import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "catherinerp18@gmail.com",
      pass: "ljjbbtngxkbwgqmp", 
    },
  });

  try {
    const { email, name, cedula } = await request.json();

    if (!email || !cedula) {
      return NextResponse.json({ error: 'El correo y la cédula son requeridos' }, { status: 400 });
    }

    const studentName = name || "Estudiante";
    const certificateId = `NC-${cedula}`;

    // 1. Buscamos al usuario en la BD por su cédula para vincular el certificado
    const user = await prisma.user.findUnique({
      where: { cedula }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado con esa cédula' }, { status: 404 });
    }

    // 2. Guardamos o actualizamos el certificado en la base de datos
    await prisma.certificate.upsert({
      where: { certificateId },
      update: { studentName, issueDate: new Date() }, // Actualiza la fecha si ya existía
      create: {
        certificateId,
        studentName,
        userId: user.id
      }
    });

    // 3. Configuración y envío del correo
    const mailOptions = {
      from: `"Equipo NanoCode" <${process.env.GMAIL_USER || "catherinerp18@gmail.com"}>`,
      to: email,
      subject: '¡Felicidades! Aquí está tu Certificado de NanoCode',
      html: `
        <div style="font-family: Arial, sans-serif; color: #434656; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2e5bff; margin: 0; font-size: 28px;">NanoCode</h1>
            <p style="color: #8e90a2; margin: 5px 0 0 0; letter-spacing: 2px; font-size: 12px; text-transform: uppercase;">Acreditación de Conocimiento</p>
          </div>
          <div style="background-color: #fbfdff; border: 2px solid #eef2fc; border-radius: 16px; padding: 40px 30px; text-align: center; box-shadow: 0 10px 30px rgba(46,91,255,0.05);">
            <p style="font-size: 16px; color: #434656; margin-bottom: 10px;">Se otorga el presente a:</p>
            <h2 style="color: #0b1326; font-size: 32px; margin: 10px 0; border-bottom: 2px solid #7cb300; display: inline-block; padding-bottom: 5px;">
              ${studentName}
            </h2>
            <p style="font-size: 16px; color: #434656; margin-top: 20px; line-height: 1.6;">
              Por haber completado con éxito la ruta de aprendizaje de <strong>Fundamentos Modernos de JavaScript y DOM</strong>, demostrando competencia en lógica de programación, asincronía y el ecosistema moderno.
            </p>
            <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eef2fc; padding-top: 20px;">
              <div style="text-align: left;">
                <p style="font-weight: bold; color: #2e5bff; margin: 0;">ID de Certificado:</p>
                <p style="font-size: 12px; color: #8e90a2; margin: 5px 0 0 0;">${certificateId}</p>
              </div>
              <div style="text-align: right;">
                <p style="font-weight: bold; color: #2e5bff; margin: 0;">Fecha de Emisión:</p>
                <p style="font-size: 12px; color: #8e90a2; margin: 5px 0 0 0;">${new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>
          <p style="text-align: center; font-size: 14px; color: #8e90a2; margin-top: 30px;">
            Este es un documento digital. Puedes adjuntarlo a tu portafolio o perfil profesional.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[ÉXITO] Certificado generado y enviado a ${email}`);

    return NextResponse.json({ message: 'Certificado generado y guardado correctamente' }, { status: 200 });

  } catch (error) {
    console.error('Error al generar el certificado:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}