'use client';

import Link from 'next/link';
import React from 'react';
import LessonArea from '../components/LessonArea';

export default function LessonOne() {
  return (
    <div className="antialiased min-h-screen flex flex-col lg:flex-row font-sans text-[16px] leading-[24px] bg-[#fbfdff] text-[#0b1326]">
      
      {/* TopAppBar (Mobile Only) */}
      <header className="fixed top-0 w-full z-50 bg-[#fbfdff]/80 backdrop-blur-md border-b border-[#171f33]/10 shadow-sm flex justify-between items-center px-[20px] h-16 lg:hidden">
        <div className="text-[24px] leading-[32px] font-semibold text-[#2e5bff] tracking-tighter">
          NanoCode
        </div>
        <div className="flex items-center gap-[12px]">
          <button className="p-[4px] text-[#8e90a2] hover:text-[#2e5bff] hover:bg-[#2e5bff]/10 rounded-full transition-colors duration-200">
            <span>[icono notificaciones]</span>
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#2e5bff]/30 bg-[#eef2fc] text-[#2e5bff] font-bold text-[12px]">
            CR
          </div>
        </div>
      </header>

      {/* SideNavBar (Desktop Only) */}
      <nav className="bg-white fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col border-r border-[#171f33]/10 shadow-sm z-40">
        <div className="p-[24px] flex flex-col items-center border-b border-[#171f33]/10 mb-[24px]">
          <div className="text-[24px] leading-[32px] font-semibold text-[#2e5bff] mb-[12px] tracking-tighter w-full text-center">
            NanoCode
          </div>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-[12px] border-2 border-[#2e5bff] shadow-[0_4px_10px_rgba(46,91,255,0.2)] bg-[#eef2fc] text-[#2e5bff] font-bold text-[24px]">
            CR
          </div>
        </div>
        
        <div className="p-[12px] flex flex-col gap-[24px] flex-grow">
          {/* Active Tab */}
          <Link
            href="#"
            className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[12px] shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:translate-x-1"
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
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Cursos</span>
          </Link>
          <Link
            href="#"
            className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[12px] hover:bg-[#2e5bff]/10 rounded-xl hover:text-[#2e5bff] transition-colors duration-200"
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
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Práctica</span>
          </Link>
        </div>
        
        <div className="p-[12px] border-t border-[#171f33]/10">
          <Link
            href="./mainPanel"
            className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[12px] hover:bg-[#2e5bff]/10 rounded-xl hover:text-[#2e5bff] transition-colors duration-200"
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
    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" 
  />
</svg></span>
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Panel Principal</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col lg:ml-64 pt-16 lg:pt-0 min-h-screen pb-24 lg:pb-0">
        
        {/* Top Section: Video Player Focus */}
        <section className="flex-none bg-[#eef2fc] p-[20px] md:p-[24px] lg:p-[40px] border-b border-[#171f33]/10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2e5bff]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-[24px] relative z-10">
            {/* Breadcrumb & Status */}
            <div className="flex items-center justify-between text-[#434656] text-[14px]">
              <div className="flex items-center gap-[4px]">
                <span className="hover:text-[#2e5bff] cursor-pointer transition-colors">Módulo 1</span>
                <span className="text-[16px]"><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={2} 
  stroke="currentColor" 
  className="w-4 h-4"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M8.25 4.5l7.5 7.5-7.5 7.5" 
  />
</svg></span>
                <span className="text-[#2e5bff] font-bold">Fundamentos Básicos</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-32 h-1 bg-white rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#7cb300] shadow-[0_0_10px_rgba(124,179,0,0.3)] rounded-full"></div>
                </div>
                <span className="text-[#7cb300] text-[12px] tracking-[0.1em] font-bold uppercase">33%</span>
              </div>
            </div>
            
            <h1 className="text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] tracking-[-0.02em] font-bold text-[#0b1326]">
              Variables y Tipos de Datos
            </h1>

              <LessonArea videoSrc="https://www.youtube.com/embed/walAu_skXHA" />
          </div>
        </section>

        {/* Bottom Section: Interactive Practice */}
        <section className="flex-grow bg-white p-[20px] md:p-[24px] lg:p-[40px] relative">
          <div className="max-w-[1000px] mx-auto w-full flex flex-col h-full gap-[24px] relative z-10">
            <div className="flex items-center justify-between mb-[12px]">
              <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1326] flex items-center gap-[12px]">
                <span className="text-[#2e5bff]">     <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 -960 960 960" 
                fill="currentColor" 
                className="w-[18px] h-[18px]"
              >
                <path d="m320-80 40-280H200l240-520h200l-40 280h160L520-80H320Z"/>
              </svg></span>
                Comprueba tu Entendimiento
              </h2>
              <span className="bg-[#a64aff]/10 border border-[#a64aff]/20 text-[#a64aff] px-[12px] py-[4px] rounded-full text-[12px] tracking-[0.1em] font-bold uppercase">
                1 de 3
              </span>
            </div>
            
            {/* Horizontal Scroll Container for Questions */}
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-[24px] pb-[24px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f4f7ff] [&::-webkit-scrollbar-thumb]:bg-[#8e90a2]/30 [&::-webkit-scrollbar-thumb]:rounded-[10px] hover:[&::-webkit-scrollbar-thumb]:bg-[#2e5bff]/50"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Question Card 1 */}
              <div className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center bg-[#fbfdff] border border-[#171f33]/10 shadow-sm rounded-xl p-[24px] flex flex-col flex-shrink-0">
                <p className="text-[18px] leading-[28px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Cuál es la forma correcta de declarar una variable constante en JavaScript que no podrá ser reasignada?
                </p>
                <div className="flex flex-col gap-[12px]">
                  <label className="group relative cursor-pointer">
                    <input className="peer sr-only" name="q1" type="radio" />
                    <div className="w-full p-[12px] rounded-lg border border-[#171f33]/10 bg-white text-[#434656] font-mono text-[14px] hover:border-[#2e5bff]/50 transition-colors peer-checked:bg-[#2e5bff]/10 peer-checked:border-[#2e5bff] peer-checked:text-[#2e5bff]">
                      var x = 10;
                    </div>
                  </label>
                  <label className="group relative cursor-pointer">
                    <input className="peer sr-only" name="q1" type="radio" />
                    <div className="w-full p-[12px] rounded-lg border border-[#171f33]/10 bg-white text-[#434656] font-mono text-[14px] hover:border-[#2e5bff]/50 transition-colors peer-checked:bg-[#2e5bff]/10 peer-checked:border-[#2e5bff] peer-checked:text-[#2e5bff]">
                      let x = 10;
                    </div>
                  </label>
                  <label className="group relative cursor-pointer">
                    <input defaultChecked className="peer sr-only" name="q1" type="radio" />
                    <div className="w-full p-[12px] rounded-lg border border-[#7cb300] bg-[#7cb300]/10 text-[#7cb300] font-mono text-[14px] shadow-[0_4px_10px_rgba(124,179,0,0.1)] relative">
                      const x = 10;
                      <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[20px]">
                        <svg 
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
</svg>
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Question Card 2 */}
              <div className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center bg-[#fbfdff] border border-[#171f33]/10 shadow-sm rounded-xl p-[24px] flex flex-col flex-shrink-0 opacity-50 pointer-events-none">
                <div className="flex items-center justify-between mb-[12px]">
                  <p className="text-[18px] leading-[28px] text-[#0b1326] flex-grow blur-[2px]">
                    ¿Qué tipo de dato devuelve el operador typeof para un arreglo []?
                  </p>
                  <span className="text-[#8e90a2]">[icono candado cerrado]</span>
                </div>
                <div className="flex flex-col gap-[12px] blur-[2px]">
                  <div className="w-full p-[12px] rounded-lg border border-[#171f33]/10 bg-white text-[#434656] font-mono text-[14px]">
                    "array"
                  </div>
                  <div className="w-full p-[12px] rounded-lg border border-[#171f33]/10 bg-white text-[#434656] font-mono text-[14px]">
                    "object"
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Actions */}
            <div className="mt-auto flex justify-end items-center gap-[24px] pt-[12px] border-t border-[#171f33]/10">
              <button className="bg-[#2e5bff] text-white font-semibold text-[14px] py-[12px] px-[40px] rounded-lg flex items-center justify-center gap-[8px] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] hover:-translate-y-1 transition-all">
                Continuar al siguiente módulo
                <span className="text-[18px]"><svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  strokeWidth={2} 
  stroke="currentColor" 
  className="w-5 h-5"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" 
  />
</svg></span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="bg-[#fbfdff]/90 backdrop-blur-lg fixed bottom-0 w-full lg:hidden rounded-t-xl border-t border-[#171f33]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-[8px] px-[20px] z-50">
        <Link
          href="#"
          className="flex flex-col items-center text-[#2e5bff] scale-110 transition-transform active:bg-[#2e5bff]/10 p-[4px] rounded-lg"
        >
          <span>[icono escuela]</span>
          <span className="text-[12px] tracking-[0.1em] font-bold uppercase mt-1">Cursos</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]"
        >
          <span>[icono terminal]</span>
          <span className="text-[12px] tracking-[0.1em] font-bold uppercase mt-1">Práctica</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]"
        >
          <span>[icono grupos]</span>
          <span className="text-[12px] tracking-[0.1em] font-bold uppercase mt-1">Comunidad</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]"
        >
          <span>[icono perfil usuario]</span>
          <span className="text-[12px] tracking-[0.1em] font-bold uppercase mt-1">Perfil</span>
        </Link>
      </nav>

    </div>
  );
}