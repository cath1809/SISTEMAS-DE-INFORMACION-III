// Archivo: /app/api/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // 1. Configurar el "transportador" de correos usando Gmail
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

    // 2. Verificar si el usuario existe en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    // AQUI ESTÁ EL CAMBIO: Si no existe, cortamos la ejecución y devolvemos un error.
    // Esto evita que se envíe el correo y le avisa al frontend.
    if (!user) {
      return NextResponse.json(
        { error: 'Este correo no está registrado en el sistema.' }, 
        { status: 404 } 
      );
    }

    // 3. Generar un número aleatorio de 6 dígitos (ej. 482915)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 4. Definir la expiración corta de 10 minutos
    const expiresAt = new Date(Date.now() + 600000); 

    // 5. Guardar el código en la base de datos
    await prisma.passwordResetToken.create({
      data: {
        code: verificationCode,
        expiresAt,
        userId: user.id
      }
    });

    // 6. Configurar y enviar el correo
    const mailOptions = {
      from: `"Soporte NanoCode" <${process.env.GMAIL_USER || "catherinerp18@gmail.com"}>`,
      to: email, 
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
    console.log(`[EXITO] Código enviado por Nodemailer a ${email}`);
    console.log(`[DEV MODE] Tu código de recuperación es: ${verificationCode}`);

    // Si llegamos hasta aquí, es porque el usuario existía y el correo se envió con éxito
    return NextResponse.json({ message: 'Se ha enviado un código de recuperación a tu correo.' }, { status: 200 });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json({ error: 'Error interno en el servidor' }, { status: 500 });
  }
}