// Archivo: /app/api/certificate/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // Configuración del transportador de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "catherinerp18@gmail.com",
      pass: "ljjbbtngxkbwgqmp", 
    },
  });

  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo es requerido' }, { status: 400 });
    }

    // Nombre por defecto si no viene en el body
    const studentName = name || "Estudiante";

    // Configuración del correo con un diseño especial para el certificado
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
                <p style="font-weight: bold; color: #2e5bff; margin: 0;">ID de Verificación:</p>
                <p style="font-size: 12px; color: #8e90a2; margin: 5px 0 0 0;">NC-${Math.floor(100000 + Math.random() * 900000)}</p>
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

    // Enviamos el correo
    await transporter.sendMail(mailOptions);
    console.log(`[ÉXITO] Certificado enviado a ${email}`);

    return NextResponse.json({ message: 'Certificado enviado correctamente' }, { status: 200 });

  } catch (error) {
    console.error('Error al enviar el certificado:', error);
    return NextResponse.json({ error: 'Error interno al enviar el correo' }, { status: 500 });
  }
}