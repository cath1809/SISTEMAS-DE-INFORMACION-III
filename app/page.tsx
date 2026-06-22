"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // Estado para controlar la animación secuencial de las líneas de la terminal simulada
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const linesCount = 8; // Número total de líneas incluyendo el Output
    const intervals = Array.from({ length: linesCount }).map((_, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 300 * index)
    );

    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-[#fbfdff] min-h-screen font-sans text-[#434656]">
      {/* TopNavBar */}
      <Header>
        <button 
          onClick={() => router.push('./register')} 
          className="bg-[#2e5bff] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 shadow-[0_0_20px_rgba(46,91,255,0.3)] font-sora"
        >
          Empezar gratis
        </button>
         <button 
          onClick={() => router.push('./sesion')} 
          className="bg-[#2e5bff] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 shadow-[0_0_20px_rgba(46,91,255,0.3)] font-sora"
        >
          Iniciar Sesión
        </button>
      </Header>
  
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
          {/* Luz ambiental clara de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2e5bff]/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#2e5bff]/10 px-4 py-1.5 rounded-full mb-6 border border-[#2e5bff]/20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 -960 960 960" 
                fill="currentColor" 
                className="text-[#507900] w-[18px] h-[18px]"
              >
                <path d="m320-80 40-280H200l240-520h200l-40 280h160L520-80H320Z"/>
              </svg>
              <span className="font-sora text-xs font-bold uppercase tracking-wider text-[#002388]">
                Aprendizaje de alto impacto
              </span>
            </div>
            <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-[#0b1326] mb-6 max-w-4xl mx-auto leading-tight">
              Domina <span className="text-amber-500">JavaScript</span>, <span className="text-[#2e5bff]">5 minutos</span> a la vez
            </h1>
            <p className="font-inter text-lg text-[#434656] mb-8 max-w-2xl mx-auto">
              Aprende JavaScript con lecciones interactivas diseñadas para tu ritmo de vida. Transforma tus ratos libres en una carrera tecnológica.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => router.push('./register')} 
                className="w-full md:w-auto bg-[#2e5bff] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_25px_rgba(46,91,255,0.4)] font-sora"
              >
                Empieza a programar gratis
              </button>
            </div>
          </div>
        </section>
  
        {/* Value Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-sora text-2xl md:text-3xl font-semibold text-[#0b1326] mb-3">
                Aprender no tiene por qué ser aburrido
              </h2>
              <div className="h-1 w-20 bg-[#2e5bff] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Micro-lecciones */}
              <div className="bg-white border border-[#171f33]/10 shadow-sm p-8 rounded-xl group hover:border-[#2e5bff]/40 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#2e5bff]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960" 
                    fill="currentColor" 
                    className="text-[#2e5bff] w-[32px] h-[32px]"
                  >
                    <path d="M360-840v-80h240v80H360Zm120 440Zm0 320q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T700-360q0-83-58.5-141.5T480-560q-83 0-141.5 58.5T280-360q0 83 58.5 141.5T480-160Zm0-200Zm-40-120h80v-160h-80v160Zm300-226 56-56-56-56-56 56 56 56Z"/>
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-semibold text-[#0b1326] mb-2">Micro-lecciones</h3>
                <p className="text-[#434656] text-sm">
                  Aprende conceptos clave en minutos con contenido optimizado para la retención rápida.
                </p>
              </div>

              {/* Práctica Real */}
              <div className="bg-white border border-[#171f33]/10 shadow-sm p-8 rounded-xl group hover:border-[#a64aff]/40 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#a64aff]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960" 
                    fill="currentColor" 
                    className="text-[#a64aff] w-[32px] h-[32px]"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm120-60 56-56-84-84 84-84-56-56-140 140 140 140Zm160-20v80h240v-80H440Z"/>
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-semibold text-[#0b1326] mb-2">Práctica Real</h3>
                <p className="text-[#434656] text-sm">
                  Escribe código desde el primer segundo en nuestro editor interactivo integrado.
                </p>
              </div>

              {/* Racha de Éxito */}
              <div className="bg-white border border-[#171f33]/10 shadow-sm p-8 rounded-xl group hover:border-[#7cb300]/40 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#7cb300]/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960" 
                    fill="currentColor" 
                    className="text-[#7cb300] w-[32px] h-[32px]"
                  >
                    <path d="M480-80q-106 0-192-56.5T151-290q-13-21-2-43.5t35-22.5q114-16 182.5-101.5T435-654q4-11 13-18.5t20-9.5q13-2 23.5 4.5T505-658q19 50 63 125t116 151q64 67 90 128t26 126q0 104-74.5 178.5T480-80Zm0-80q71 0 120.5-49.5T650-330q0-46-17.5-91.5T580-516q-52-61-90.5-121.5T444-762q-47 70-109 133.5T202-536q23 75 80.5 125.5T418-356q13 1 21 10.5t5 22.5q-12 36-12 67.5t5 61.5q12 17 25 24.5t18-4.5q1-1 3-3.5t5-6.5q4-7 4-15.5t-3.5-15q-10.5-17-10.5-35.5t8-33.5q24-38 67-62.5t89-24.5q-19 52-51 98.5T492-230q-9 9-11 21t4 22q9 17 25.5 24.5T544-168q18-18 31.5-39.5T591-254q28 20 48.5 48.5T660-146q-41 33-91.5 49.5T480-160Z"/>
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-semibold text-[#0b1326] mb-2">Racha de Éxito</h3>
                <p className="text-[#434656] text-sm">
                  Gamificación diseñada para mantenerte motivado y convertir el estudio en un hábito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Section (Mock Terminal Light Theme) */}
        <section className="py-16 relative overflow-hidden bg-[#f4f7ff]">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#a64aff]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-[#171f33]/10">
              
              {/* Terminal Header */}
              <div className="bg-[#eef2fc] px-6 py-3 flex justify-between items-center border-b border-[#171f33]/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff4757]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffa502]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#2ed573]"></div>
                </div>
                <div className="text-[#434656] font-mono text-xs">index.js — NanoCode IDE</div>
                <div className="w-10"></div>
              </div>
              
              {/* Terminal Content Animado (Temática clara) */}
              <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto bg-[#ffffff]">
                {[
                  { num: 1, content: <><span className="text-[#a64aff]">function</span> <span className="text-[#2e5bff]">calculateProgress</span>(streak, days) {"{"}</> },
                  { num: 2, content: <span className="text-[#8e90a2] ml-4">// Check if user is on fire</span> },
                  { num: 3, content: <><span className="text-[#a64aff] ml-4">if</span> (streak &gt; <span className="text-[#a64aff]">7</span>) {"{"}</> },
                  { num: 4, content: <><span className="text-[#a64aff] ml-8">return</span> <span className="text-[#507900]">"🚀 Master Level Unlocked"</span>;</> },
                  { num: 5, content: <span className="ml-4">{"}"}</span> },
                  { num: 6, content: <><span className="text-[#a64aff] ml-4">return</span> <span className="text-[#507900]">"Keep going!"</span>;</> },
                  { num: 7, content: <span>{"}"}</span> }
                ].map((line, idx) => (
                  <div 
                    key={line.num}
                    className="flex gap-4 transition-all duration-500 ease-out text-[#171f33]"
                    style={{
                      opacity: visibleLines > idx ? 1 : 0,
                      transform: visibleLines > idx ? "translateY(0px)" : "translateY(10px)"
                    }}
                  >
                    <span className="text-[#8e90a2]/50 select-none w-4">{line.num}</span>
                    <span>{line.content}</span>
                  </div>
                ))}
                
                {/* Output Line */}
                <div 
                  className="mt-4 pt-4 border-t border-[#171f33]/10 transition-all duration-500 ease-out"
                  style={{
                    opacity: visibleLines >= 8 ? 1 : 0,
                    transform: visibleLines >= 8 ? "translateY(0px)" : "translateY(10px)"
                  }}
                >
                  <span className="text-[#7cb300] font-bold">Output: </span>
                  <span className="text-[#171f33]">"🚀 Master Level Unlocked"</span>
                </div>
              </div>
            </div>
          </div> 
        </section>

        {/* Cómo funciona */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-sora text-2xl md:text-3xl font-semibold text-[#0b1326]">Cómo funciona</h2>
              <p className="text-[#434656] mt-1 text-sm">Tu viaje hacia el dominio tecnológico en tres sencillos pasos.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-between relative">
              
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#2e5bff] text-white flex items-center justify-center font-sora text-2xl font-bold mb-4 shadow-[0_0_20px_rgba(46,91,255,0.3)]">
                  1
                </div>
                <h4 className="font-sora text-lg font-semibold mb-2 text-[#0b1326]">Elige tu ruta</h4>
                <p className="text-[#434656] text-sm">Desde fundamentos de programación hasta desarrollo web avanzado.</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#a64aff] text-white flex items-center justify-center font-sora text-2xl font-bold mb-4 shadow-[0_0_20px_rgba(166,74,255,0.3)]">
                  2
                </div>
                <h4 className="font-sora text-lg font-semibold mb-2 text-[#0b1326]">Reto diario</h4>
                <p className="text-[#434656] text-sm">Completa un reto interactivo de 5 minutos diseñado para tu nivel actual.</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#7cb300] text-white flex items-center justify-center font-sora text-2xl font-bold mb-4 shadow-[0_0_20px_rgba(124,179,0,0.3)]">
                  3
                </div>
                <h4 className="font-sora text-lg font-semibold mb-2 text-[#0b1326]">Logros</h4>
                <p className="text-[#434656] text-sm">Desbloquea certificados y medallas mientras construyes tu portafolio.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#fbfdff] border-t border-[#171f33]/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full py-12 px-5 md:px-8 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-sora text-xl font-bold text-[#2e5bff]">
              NanoCode
            </div>
            <p className="text-[#434656] text-xs text-center md:text-left max-w-xs">
              © {new Date().getFullYear()} NanoCode. Transforma tu carrera 5 minutos a la vez.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a className="text-[#434656] hover:text-[#2e5bff] transition-colors" href="#">Privacidad</a>
            <a className="text-[#434656] hover:text-[#2e5bff] transition-colors" href="#">Términos</a>
            <a className="text-[#434656] hover:text-[#2e5bff] transition-colors" href="#">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}