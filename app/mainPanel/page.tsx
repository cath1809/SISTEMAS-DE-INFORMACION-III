'use client';

import React, { useState, MouseEvent } from 'react';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="bg-[#fbfdff] text-[#434656] text-[14px] leading-[20px] selection:bg-[#2e5bff] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Top Navigation Bar (Mobile only) */}
      <header className="fixed top-0 w-full z-50 bg-[#fbfdff]/80 backdrop-blur-md border-b border-[#171f33]/10 shadow-sm flex justify-between items-center px-[20px] h-16 lg:hidden">
        <div className="flex items-center gap-[8px]">
          <span className="font-bold text-[#2e5bff]">Catherine</span>
          <span className="text-[20px] leading-[28px] font-semibold text-[#2e5bff] tracking-tighter">
            NanoCode
          </span>
        </div>
        <div className="flex gap-[12px] text-[#2e5bff]">
          <span>[icono notificaciones]</span>
          <span><svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 -960 960 960" 
                fill="currentColor" 
                className="w-[18px] h-[18px]"
              >
                <path d="m320-80 40-280H200l240-520h200l-40 280h160L520-80H320Z"/>
              </svg></span>
        </div>
      </header>

      {/* Side Navigation Bar (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col bg-white border-r border-[#171f33]/10 shadow-sm p-[12px] gap-[24px] z-40">
        <div className="flex flex-col gap-[4px] px-[12px] py-[24px]">
          <div className="flex items-center gap-[12px]">
            <span className="text-[20px] leading-[28px] font-semibold text-[#2e5bff]">
              NanoCode
            </span>
          </div>
        </div>
        
        <nav className="flex flex-col gap-[8px] flex-grow">
          {/* Active state */}
          <a
            href="#"
            className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[8px] shadow-[0_4px_15px_rgba(46,91,255,0.2)] active:translate-x-1 transition-all"
          >
            <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" 
  />
</svg></span>
            <span>Cursos</span>
          </a>
          <a
            href="#"
            className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all"
          >
            <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
  />
</svg></span>
            <span>Práctica</span>
          </a>
          <a
            href="#"
            className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all"
          >
            <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
  />
</svg></span>
            <span>Perfil</span>
          </a>
        </nav>
        
        <div className="mt-auto flex flex-col gap-[12px]">
          <button className="bg-[#2e5bff] text-white py-[10px] px-[20px] rounded-xl font-bold flex items-center justify-center gap-[4px] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:scale-95">
            <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  fill="currentColor" 
  className="w-5 h-5"
>
  <path 
    fillRule="evenodd" 
    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" 
    clipRule="evenodd" 
  />
</svg></span> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 p-[20px] md:p-[40px] mt-16 lg:mt-0 max-w-[1200px] mx-auto pb-24 lg:pb-[8px]">
        
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[48px]">
          <div>
            <h1 className="text-[28px] md:text-[36px] leading-[36px] md:leading-[44px] tracking-[-0.02em] font-bold text-[#0b1326]">
              Hola, Catherine!
            </h1>
            <p className="text-[#434656] text-[15px] leading-[24px] mt-[8px]">
              Tu progreso hoy es excepcional. Sigue así.
            </p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          
          {/* Current Course (Featured Card) */}
          <div 
            onMouseMove={handleMouseMove}
            className="md:col-span-12 p-[24px] rounded-xl relative overflow-hidden group bg-white shadow-sm border border-[#171f33]/10"
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e5bff]/5 blur-[60px] -mr-16 -mt-16 rounded-full group-hover:bg-[#2e5bff]/10 transition-all"></div>
            <div className="flex flex-col h-full justify-between gap-[24px] relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] leading-[16px] tracking-[0.1em] font-bold uppercase text-[#2e5bff] mb-[4px] block">
                    CURSO EN PROGRESO
                  </span>
                  <h2 className="text-[20px] leading-[28px] font-semibold text-[#0b1326]">
                    JavaScript Avanzado: Manipulación del DOM
                  </h2>
                </div>
                
              </div>
              <div className="space-y-[8px]">
                <div className="flex justify-between text-[#434656]">
                  <span>Progreso del módulo</span>
                  <span className="font-bold text-[#2e5bff]">65%</span>
                </div>
                <div className="w-full h-2 bg-[#eef2fc] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7cb300] shadow-[0_0_10px_rgba(124,179,0,0.3)]"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-[12px]">
                <button className="bg-[#2e5bff] text-white py-[10px] px-[24px] rounded-xl font-bold flex items-center gap-[8px] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:scale-95">
                  Continuar lección <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  fill="currentColor" 
  className="w-5 h-5"
>
  <path 
    fillRule="evenodd" 
    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.007c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
    clipRule="evenodd" 
  />
</svg></span>
                </button>
                <button className="bg-[#f4f7ff] text-[#2e5bff] py-[10px] px-[24px] rounded-xl font-medium border border-[#2e5bff]/20 hover:bg-[#eef2fc] transition-all">
                  Ver temario
                </button>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div 
            onMouseMove={handleMouseMove}
            className="md:col-span-12 p-[24px] rounded-xl flex flex-col md:flex-row items-center gap-[24px] bg-gradient-to-br from-[#fbfdff] to-[#eef2fc] border border-[#2e5bff]/20 shadow-sm"
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
          >
            <div className="flex-grow space-y-[12px]">
              <div className="flex items-center gap-[8px]">
                <span className="text-[#7cb300]"><span><svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 -960 960 960" 
                fill="currentColor" 
                className="w-[18px] h-[18px]"
              >
                <path d="m320-80 40-280H200l240-520h200l-40 280h160L520-80H320Z"/>
              </svg></span></span>
                <h3 className="text-[20px] leading-[28px] font-semibold text-[#0b1326]">
                  Reto Diario: 5 Minutos
                </h3>
              </div>
              <p className="text-[#434656]">
                Optimiza esta función de flecha para mejorar el tiempo de ejecución en arreglos grandes.
              </p>
              
              {/* Code Block */}
              <div className="bg-white p-[12px] rounded-lg border border-[#171f33]/10 text-[13px] leading-[20px] font-mono overflow-x-auto shadow-sm">
                <code className="text-[#2e5bff]">
                  <span className="text-[#a64aff]">const</span>{' '}
                  <span className="text-[#2e5bff]">optimize</span> = (arr) ={'>'} {'{\n'}
                  <span className="text-[#8e90a2]">  // Tu código aquí...</span>
                  {'\n}'};
                </code>
              </div>
            </div>
            <button className="shrink-0 bg-[#7cb300] text-white py-[12px] px-[32px] rounded-xl font-extrabold text-[16px] md:text-[18px] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(124,179,0,0.3)]">
              RESOLVER AHORA
            </button>
          </div>

          {/* Recommendations (Grid) */}
          <section className="md:col-span-12 space-y-[24px]">
            <div className="flex justify-between items-center mt-[24px]">
              <h3 className="text-[20px] leading-[28px] md:text-[28px] md:leading-[36px] font-bold tracking-[-0.02em] text-[#0b1326]">
                Temario del Curso: JavaScript Maestro
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* Módulo 1 */}
              <div 
              onClick={() => router.push('./module1')}
                onMouseMove={handleMouseMove}
                className="p-[20px] rounded-xl border border-[#7cb300]/30 flex flex-col gap-[12px] bg-white shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
                style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#0b1326] text-[16px]">Módulo 1: Fundamentos Básicos</h4>
                  <span className="text-[#7cb300]"><span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
  />
</svg></span></span>
                </div>
                <p className="text-[#434656]">
                  Variables, tipos de datos, operadores y estructuras de control fundamentales.
                </p>
                <div className="mt-auto pt-[12px]">
                  <span className="text-[11px] tracking-[0.1em] font-bold text-[#7cb300]">COMPLETADO</span>
                </div>
              </div>

              {/* Módulo 2 */}
              <div 
                onMouseMove={handleMouseMove}
                className="p-[20px] rounded-xl border border-[#2e5bff]/30 flex flex-col gap-[12px] bg-white shadow-[0_4px_15px_rgba(46,91,255,0.1)] hover:-translate-y-1 transition-transform cursor-pointer"
                style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#0b1326] text-[16px]">Módulo 2: Manipulación del DOM</h4>
                  <span className="text-[#2e5bff] animate-pulse"><span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" 
  />
</svg></span></span>
                </div>
                <p className="text-[#434656]">
                  Selección de elementos, eventos, modificación de estilos y estructura del documento.
                </p>
                <div className="mt-auto pt-[12px]">
                  <span className="text-[11px] tracking-[0.1em] font-bold text-[#2e5bff]">EN CURSO</span>
                </div>
              </div>

              {/* Módulo 3 */}
              <div 
                onMouseMove={handleMouseMove}
                className="p-[20px] rounded-xl opacity-60 flex flex-col gap-[12px] grayscale bg-[#f4f7ff] border border-[#171f33]/10"
                style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#0b1326] text-[16px]">Módulo 3: Asincronía y APIs</h4>
                  <span className="text-[#8e90a2]"><span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
  />
</svg></span></span>
                </div>
                <p className="text-[#8e90a2]">
                  Promesas, async/await, Fetch API y consumo de servicios externos.
                </p>
                <div className="mt-auto pt-[12px]">
                  <span className="text-[11px] tracking-[0.1em] font-bold text-[#8e90a2]">BLOQUEADO</span>
                </div>
              </div>

              {/* Módulo 4 */}
              <div 
                onMouseMove={handleMouseMove}
                className="p-[20px] rounded-xl opacity-60 flex flex-col gap-[12px] grayscale bg-[#f4f7ff] border border-[#171f33]/10"
                style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#0b1326] text-[16px]">Módulo 4: Frameworks y Ecosistema</h4>
                  <span className="text-[#8e90a2]"><span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke="currentColor" 
  className="w-6 h-6"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
  />
</svg></span></span>
                </div>
                <p className="text-[#8e90a2]">
                  Introducción a React, Vue, Node.js y herramientas de empaquetado modernas.
                </p>
                <div className="mt-auto pt-[12px]">
                  <span className="text-[11px] tracking-[0.1em] font-bold text-[#8e90a2]">BLOQUEADO</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 w-full lg:hidden bg-[#fbfdff]/90 backdrop-blur-lg border-t border-[#171f33]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-[8px] px-[20px] z-50">
        <a href="#" className="flex flex-col items-center text-[#2e5bff] scale-110 transition-transform">
          <span>[icono escuela]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">CURSOS</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>[icono terminal]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">PRÁCTICA</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>[icono grupos]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">COMUNIDAD</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>[icono perfil]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">PERFIL</span>
        </a>
      </nav>
      
    </div>
  );
}