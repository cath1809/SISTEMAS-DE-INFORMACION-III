// Archivo: /app/api/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
// import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    // 2. Configurar el "transportador" de correos usando Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "catherinerp18@gmail.com",
        pass: "ljjbbtngxkbwgqmp",
      },
    });
  
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo es requerido' }, { status: 400 });
    }

    // 1. Verificar si el usuario existe
    const user = await prisma.user.findUnique({ where: { email } });

    // TIP DE SEGURIDAD: Si el usuario no existe, devolvemos éxito para evitar ataques de enumeración.
    if (!user) {
      return NextResponse.json({ message: 'Si el correo existe, se ha enviado un código de recuperación.' }, { status: 200 });
    }

    // 2. Generar un número aleatorio de 6 dígitos (ej. 482915)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 3. Definir la expiración corta de 10 minutos
    const expiresAt = new Date(Date.now() + 600000); 

    // 4. Guardar el código en Supabase (Asegúrate de haber cambiado 'token' por 'code' en tu schema.prisma)
    await prisma.passwordResetToken.create({
      data: {
        code: verificationCode,
        expiresAt,
        userId: user.id
      }
    });

    // 3. Enviar el correo con la contraseña actual
    const mailOptions = {
      from: `"Soporte NanoCode" <${process.env.GMAIL_USER}>`,
      to: email, // Aquí le llegará a cualquier correo sin restricciones
      subject: 'Recuperación de tus accesos',
     html: `
        <div style="font-family: sans-serif; color: #434656; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #2e5bff;">Recuperación de contraseña</h2>
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña. Ingresa el siguiente código de 6 dígitos para continuar:</p>
          
          <div style="background-color: #eef2fc; padding: 20px; border-radius: 12px; font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; color: #0b1326; margin: 30px 0; border: 1px solid rgba(46,91,255,0.1);">
            ${verificationCode}
          </div>
          
          <p style="font-size: 14px;">Este código <strong>expirará en 10 minutos</strong>.</p>
          <p style="font-size: 14px; color: #8e90a2;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura. Tu cuenta sigue protegida.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[EXITO] Contraseña enviada por Nodemailer a ${email}`);
    // Lo imprimimos en consola por si agotas tu límite gratuito de Resend en fase de desarrollo
    console.log(`[DEV MODE] Tu código de recuperación es: ${verificationCode}`);

    return NextResponse.json({ message: 'Si el correo existe, se ha enviado un código de recuperación.' }, { status: 200 });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json({ error: 'Error interno en el servidor' }, { status: 500 });
  }
}

