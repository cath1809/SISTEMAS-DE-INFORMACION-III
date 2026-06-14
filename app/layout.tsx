import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NanoCode | Domina JavaScript, 5 minutos a la vez",
  description: "Aprende JavaScript con lecciones interactivas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Fuentes e Iconos de Google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Sora:wght@600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface font-inter antialiased selection:bg-primary-container selection:text-white">
        
        {children}
      </body>
    </html>
  );
}