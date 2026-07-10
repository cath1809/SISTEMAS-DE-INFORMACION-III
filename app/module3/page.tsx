'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import LessonArea from '../components/LessonArea';

export default function LessonThree() {
  const [q1, setQ1] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q2, setQ2] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q3, setQ3] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q4, setQ4] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });

  // NUEVO: Estado para verificar el rol del usuario
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null; // Recuperamos el rol
    
    if (role) setUserRole(role);
    if (!userEmail) return;
    
    const cachedAnswers = localStorage.getItem(`mod3_answers_${userEmail}`);
    if (cachedAnswers) {
      const parsed = JSON.parse(cachedAnswers);
      if (parsed.q1) setQ1(parsed.q1);
      if (parsed.q2) setQ2(parsed.q2);
      if (parsed.q3) setQ3(parsed.q3);
      if (parsed.q4) setQ4(parsed.q4);
    }
  }, []);

  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    if (!userEmail) return;
    if (q1.val || q2.val || q3.val || q4.val) {
      localStorage.setItem(`mod3_answers_${userEmail}`, JSON.stringify({ q1, q2, q3, q4 }));
    }
  }, [q1, q2, q3, q4]);

  const handleQ1 = (value: string) => {
    if (q1.status === 'correct') return;
    const isCorrect = value === 'pending';
    setQ1({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ2 = () => {
    if (q2.status === 'correct' || !q2.val) return;
    const normalized = q2.val.trim().toLowerCase();
    const isCorrect = normalized === "async";
    setQ2(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  const handleQ3 = (value: string) => {
    if (q3.status === 'correct') return;
    const isCorrect = value === '.json()';
    setQ3({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ4 = () => {
    if (q4.status === 'correct' || !q4.val) return;
    const normalized = q4.val.trim().toLowerCase().replace(/\s+/g, '').replace(/;$/, '').replace(/"/g, "'");
    const isCorrect = normalized === "constres=awaitfetch('/api/data')";
    setQ4(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  // NUEVO: Lógica combinada para saber si todo está correcto y si puede continuar
  const isAllCorrect = q1.status === 'correct' && q2.status === 'correct' && q3.status === 'correct' && q4.status === 'correct';
  const canProceed = isAllCorrect || userRole === 'ADMIN';

  const calculateProgress = () => {
    let correctCount = 0;
    if (q1.status === 'correct') correctCount++;
    if (q2.status === 'correct') correctCount++;
    if (q3.status === 'correct') correctCount++;
    if (q4.status === 'correct') correctCount++;
    return (correctCount / 4) * 100;
  };

  const currentProgress = calculateProgress();

  useEffect(() => {
    if (currentProgress === 0) return;
    const saveProgressToDB = async () => {
      const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      if (!userEmail) return;
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, moduleId: 3, progressPct: currentProgress })
        });
      } catch (error) { console.error(error); }
    };
    saveProgressToDB();
  }, [currentProgress]);

  // Clase base pura. Los colores de fondo se aplican en cada tarjeta.
  const cardBaseClass = "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center p-[24px] rounded-xl border flex flex-col transition-all duration-300 shadow-sm relative overflow-hidden";

  return (
    <div className="antialiased min-h-screen flex flex-col lg:flex-row font-sans bg-[#fbfdff] text-[#0b1326]">
      
      {/* TopAppBar (Mobile Only) */}
      <header className="fixed top-0 w-full z-50 bg-[#fbfdff]/80 backdrop-blur-md border-b border-[#171f33]/10 shadow-sm flex justify-between items-center px-[20px] h-16 lg:hidden">
        <div className="text-[24px] leading-[32px] font-semibold text-[#2e5bff] tracking-tighter">
          NanoCode
        </div>
        <div className="flex items-center gap-[12px]">
          <button className="p-[4px] text-[#8e90a2] hover:text-[#2e5bff] hover:bg-[#2e5bff]/10 rounded-full transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
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
          <Link href="/mainPanel" className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[12px] shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:translate-x-1">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </span>
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Cursos</span>
          </Link>
          <Link href="#" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[12px] hover:bg-[#2e5bff]/10 rounded-xl hover:text-[#2e5bff] transition-colors duration-200">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Práctica</span>
          </Link>
        </div>
        
        <div className="p-[12px] border-t border-[#171f33]/10">
          <Link href="./mainPanel" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[12px] hover:bg-[#2e5bff]/10 rounded-xl hover:text-[#2e5bff] transition-colors duration-200">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
              </svg>
            </span>
            <span className="text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase">Panel Principal</span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col lg:ml-64 pt-16 lg:pt-0 min-h-screen pb-24">
        
        <section className="flex-none bg-[#eef2fc] p-[40px] border-b border-[#171f33]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2e5bff]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-[24px] relative z-10">
            <div className="flex items-center justify-between text-[#434656] text-[14px]">
              <div className="flex items-center gap-[4px] flex-wrap">
                <span className="hover:text-[#2e5bff] cursor-pointer transition-colors">Módulo 3</span>
                <span className="mx-1">/</span>
                <span className="text-[#2e5bff] font-bold">Asincronía y APIs</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-32 h-2 bg-white/50 rounded-full overflow-hidden hidden md:block">
                  <div 
                    className="h-full bg-[#7cb300] shadow-[0_0_10px_rgba(124,179,0,0.4)] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>
                <span className="text-[#7cb300] text-[12px] tracking-[0.1em] font-bold uppercase">
                  {currentProgress === 100 ? 'Completado' : `${currentProgress}%`}
                </span>
              </div>
            </div>
            
            <div className="space-y-[8px]">
              <h1 className="text-[32px] md:text-[48px] font-bold text-[#0b1326]">
                Asincronía y APIs
              </h1>
              <p className="text-[#434656] text-[16px] md:text-[18px] max-w-2xl leading-relaxed">
                Domina las Promesas, async/await, Fetch API y el consumo de servicios externos, implementando manejo de errores seguro con try/catch.
              </p>
            </div>

            <LessonArea videoSrc="https://www.youtube.com/embed/Q3HtXuDEy5s" />
          </div>
        </section>

        <section className="flex-grow bg-white p-[40px] relative">
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-[24px]">
            <div className="flex items-center justify-between mb-[12px]">
               
              <h2 className="text-[24px] font-semibold text-[#0b1326] flex items-center gap-[12px]">
                Comprueba tu Entendimiento
              </h2>
              <span className="bg-[#2e5bff]/10 border border-[#2e5bff]/20 text-[#2e5bff] px-[12px] py-[4px] rounded-full text-[12px] tracking-[0.1em] font-bold uppercase">
                4 Desafíos
              </span>
            </div>
            
            <div className="flex gap-[24px] overflow-x-auto pb-[24px]" style={{ scrollBehavior: 'smooth' }}>
              
              {/* Q1: Teoría - Promesas */}
              <div className={`${cardBaseClass} ${q1.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/40' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Promesas</span>
                  {q1.status === 'correct' && <span className="text-[#7cb300] font-bold">✓</span>}
                </div>
                <p className="text-[18px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Cuál es el estado inicial de una Promesa en JavaScript antes de resolverse o rechazarse?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['waiting', 'pending', 'undefined', 'null'].map((opt) => (
                    <button 
                      key={opt} 
                      onClick={() => handleQ1(opt)} 
                      disabled={q1.status === 'correct'}
                      className={`w-full p-[14px] rounded-lg border font-mono text-[14px] text-left transition-all ${
                        q1.status === 'correct' 
                          ? (q1.val === opt ? 'bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] font-bold cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-40 cursor-not-allowed')
                          : (q1.val === opt && q1.status === 'incorrect' ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-[#171f33]/10 text-[#434656] hover:border-[#2e5bff]/50')
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q2: Práctica Terminal - Async/Await */}
              <div className={`${cardBaseClass} ${q2.status === 'correct' ? 'bg-[#15241b] border-[#7cb300]/50' : 'bg-[#0b1326] border-[#2e5bff]/30 shadow-[0_4px_20px_rgba(46,91,255,0.15)]'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Async/Await</span>
                  {q2.status === 'correct' && <span className="text-[#7cb300] font-bold">✓ ÉXITO</span>}
                </div>
                <p className="text-[16px] text-white/90 mb-[24px] flex-grow">
                  Escribe la <span className="text-[#a64aff]">palabra clave</span> necesaria antes de declarar una función para indicar que es asíncrona.
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  <div className={`flex items-center gap-[10px] p-[14px] rounded-lg border transition-colors ${q2.status === 'correct' ? 'bg-black/20 border-[#7cb300]/30' : 'bg-black/50 border-white/10 focus-within:border-[#a9f900]/50'}`}>
                    <span className="text-[#2e5bff] font-mono font-bold">~</span>
                    <input 
                      type="text" 
                      value={q2.val}
                      disabled={q2.status === 'correct'} 
                      onChange={(e) => { setQ2({ val: e.target.value, status: 'idle' }); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkQ2()}
                      placeholder="________ function obtenerDatos() {}"
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {q2.status !== 'correct' && (
                    <button onClick={checkQ2} className="w-full py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all text-[12px]">
                      VERIFICAR
                    </button>
                  )}
                  {q2.status === 'incorrect' && <p className="text-red-400 text-[12px] text-center">✗ Pista: Son 5 letras</p>}
                </div>
              </div>

              {/* Q3: Teoría - Fetch API */}
              <div className={`${cardBaseClass} ${q3.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/40' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Fetch API</span>
                  {q3.status === 'correct' && <span className="text-[#7cb300] font-bold">✓</span>}
                </div>
                <p className="text-[18px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Qué método se utiliza en la Fetch API para convertir la respuesta HTTP en un objeto JavaScript?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['.toObject()', '.parse()', '.text()', '.json()'].map((opt) => (
                    <button 
                      key={opt} 
                      onClick={() => handleQ3(opt)} 
                      disabled={q3.status === 'correct'}
                      className={`w-full p-[14px] rounded-lg border font-mono text-[14px] text-left transition-all ${
                        q3.status === 'correct' 
                          ? (q3.val === opt ? 'bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] font-bold cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-40 cursor-not-allowed')
                          : (q3.val === opt && q3.status === 'incorrect' ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-[#171f33]/10 text-[#434656] hover:border-[#2e5bff]/50')
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4: Práctica Terminal - Consumo Externo */}
              <div className={`${cardBaseClass} ${q4.status === 'correct' ? 'bg-[#15241b] border-[#7cb300]/50' : 'bg-[#0b1326] border-[#2e5bff]/30 shadow-[0_4px_20px_rgba(46,91,255,0.15)]'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Petición GET</span>
                  {q4.status === 'correct' && <span className="text-[#7cb300] font-bold">✓ ÉXITO</span>}
                </div>
                <p className="text-[16px] text-white/90 mb-[24px] flex-grow">
                  Escribe el código para declarar una constante <code>res</code> esperando a <code>fetch('/api/data')</code>.
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  <div className={`flex items-center gap-[10px] p-[14px] rounded-lg border transition-colors ${q4.status === 'correct' ? 'bg-black/20 border-[#7cb300]/30' : 'bg-black/50 border-white/10 focus-within:border-[#a9f900]/50'}`}>
                    <span className="text-[#2e5bff] font-mono font-bold">{'>'}</span>
                    <input 
                      type="text" 
                      value={q4.val}
                      disabled={q4.status === 'correct'} 
                      onChange={(e) => { setQ4({ val: e.target.value, status: 'idle' }); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkQ4()}
                      placeholder="Escribe tu código aquí..."
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {q4.status !== 'correct' && (
                    <button onClick={checkQ4} className="w-full py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all text-[12px]">
                      VERIFICAR
                    </button>
                  )}
                  {q4.status === 'incorrect' && <p className="text-red-400 text-[12px] text-center">✗ Recuerda: const res = await fetch(...)</p>}
                </div>
              </div>

            </div>
            
            {/* CTA Actions MODIFICADO */}
            <div className="mt-auto flex justify-between items-center pt-6 border-t border-[#171f33]/10">
              {/* Botón para regresar al módulo anterior (Módulo 2) */}
              <Link 
                href="/module2" 
                className="py-[12px] px-[24px] md:px-[40px] rounded-xl text-[#434656] bg-[#f4f7ff] border border-[#171f33]/10 font-semibold text-[14px] flex items-center justify-center gap-[8px] transition-all hover:bg-[#eef2fc] hover:text-[#2e5bff]"
              >
                <span className="text-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                  </svg>
                </span>
                <span className="hidden md:inline">Regresar al módulo anterior</span>
                <span className="md:hidden">Atrás</span>
              </Link>

              {/* Botón para continuar al siguiente módulo (Módulo 4) */}
              <Link 
                href={canProceed ? "/module4" : "#"}
                onClick={(e) => {
                  if (!canProceed) e.preventDefault();
                }}
                className={`text-white font-semibold text-[14px] py-[12px] px-[24px] md:px-[40px] rounded-xl flex items-center justify-center gap-[8px] transition-all shadow-md ${
                  isAllCorrect 
                  ? 'bg-[#7cb300] hover:scale-105 hover:shadow-[0_4px_15px_rgba(124,179,0,0.4)]' 
                  : canProceed
                    ? 'bg-[#2e5bff] hover:bg-[#2e5bff]/90 hover:scale-105'
                    : 'bg-[#2e5bff] opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                <span className="hidden md:inline">
                  {isAllCorrect ? "¡Lección Completada!" : "Continuar al siguiente módulo"}
                </span>
                <span className="md:hidden">Siguiente</span>
                <span className="text-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="bg-[#fbfdff]/90 backdrop-blur-lg fixed bottom-0 w-full lg:hidden rounded-t-xl border-t border-[#171f33]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-[8px] px-[20px] z-50">
        <Link href="/mainPanel" className="flex flex-col items-center text-[#2e5bff] scale-110 transition-transform active:bg-[#2e5bff]/10 p-[4px] rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
          <span className="text-[10px] tracking-[0.1em] font-bold uppercase mt-1">Cursos</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] tracking-[0.1em] font-bold uppercase mt-1">Práctica</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          <span className="text-[10px] tracking-[0.1em] font-bold uppercase mt-1">Comunidad</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 p-[4px] rounded-lg transition-transform hover:text-[#2e5bff]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          <span className="text-[10px] tracking-[0.1em] font-bold uppercase mt-1">Perfil</span>
        </Link>
      </nav>

    </div>
  );
}