'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import LessonArea from '../components/LessonArea';

export default function LessonOne() {
  // Estados para validar las respuestas en tiempo real
  const [q1, setQ1] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q2, setQ2] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q3, setQ3] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q4, setQ4] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  
  // NUEVO: Estado para verificar el rol del usuario
  const [userRole, setUserRole] = useState<string | null>(null);

  // 1. RECUPERAR RESPUESTAS Y ROL AL CARGAR LA PÁGINA
  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null; // Recuperamos el rol
    
    if (role) setUserRole(role);
    if (!userEmail) return;

    // Buscamos si este usuario ya tiene respuestas guardadas para el módulo 1
    const cachedAnswers = localStorage.getItem(`mod1_answers_${userEmail}`);
    if (cachedAnswers) {
      const parsed = JSON.parse(cachedAnswers);
      if (parsed.q1) setQ1(parsed.q1);
      if (parsed.q2) setQ2(parsed.q2);
      if (parsed.q3) setQ3(parsed.q3);
      if (parsed.q4) setQ4(parsed.q4);
    }
  }, []);

  // 2. GUARDAR RESPUESTAS EN CACHÉ CADA VEZ QUE EL ESTUDIANTE RESPONDE ALGO
  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    if (!userEmail) return;

    // Solo guardamos si hay al menos una respuesta intentada
    if (q1.val || q2.val || q3.val || q4.val) {
      localStorage.setItem(`mod1_answers_${userEmail}`, JSON.stringify({ q1, q2, q3, q4 }));
    }
  }, [q1, q2, q3, q4]);

  // Lógica de Validación (Con prevención si ya está correcto)
  const handleQ1 = (value: string) => {
    if (q1.status === 'correct') return; // Bloqueo por éxito
    const isCorrect = value === 'const';
    setQ1({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ2 = () => {
    if (q2.status === 'correct' || !q2.val) return; // Bloqueo por éxito
    const normalized = q2.val.trim().toLowerCase().replace(/\s+/g, '').replace(/;$/, '');
    const isCorrect = normalized === "letedad=25";
    setQ2(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  const handleQ3 = (value: string) => {
    if (q3.status === 'correct') return; // Bloqueo por éxito
    const isCorrect = value === 'string';
    setQ3({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ4 = () => {
    if (q4.status === 'correct' || !q4.val) return; // Bloqueo por éxito
    const normalized = q4.val.trim().replace(/\s+/g, '').replace(/;$/, '').replace(/"/g, "'");
    const isCorrect = normalized === "constcurso='NanoCode'";
    setQ4(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  // NUEVO: Lógica combinada para saber si todo está correcto y si puede continuar
  const isAllCorrect = q1.status === 'correct' && q2.status === 'correct' && q3.status === 'correct' && q4.status === 'correct';
  const canProceed = isAllCorrect || userRole === 'ADMIN';

  // Calcular el progreso dinámico (0 a 100)
  const calculateProgress = () => {
    let correctCount = 0;
    if (q1.status === 'correct') correctCount++;
    if (q2.status === 'correct') correctCount++;
    if (q3.status === 'correct') correctCount++;
    if (q4.status === 'correct') correctCount++;
    return (correctCount / 4) * 100; 
  };

  const currentProgress = calculateProgress();

  // Guardar en la base de datos automáticamente
  useEffect(() => {
    if (currentProgress === 0) return;

    const saveProgressToDB = async () => {
      const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      if (!userEmail) return;

      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: userEmail, 
            moduleId: 1, 
            progressPct: currentProgress 
          })
        });
      } catch (error) {
        console.error("Error de red al guardar el progreso:", error);
      }
    };

    saveProgressToDB();
  }, [currentProgress]);

  return (
    <div className="antialiased min-h-screen flex flex-col lg:flex-row font-sans text-[16px] leading-[24px] bg-[#fbfdff] text-[#0b1326]">
      
      {/* TopAppBar (Mobile Only) */}
      <header className="fixed top-0 w-full z-50 bg-[#fbfdff]/80 backdrop-blur-md border-b border-[#171f33]/10 shadow-sm flex justify-between items-center px-[20px] h-16 lg:hidden">
        <div className="text-[24px] leading-[32px] font-semibold text-[#2e5bff] tracking-tighter">
          NanoCode
        </div>
        <div className="flex items-center gap-[12px]">
          <button className="p-[4px] text-[#8e90a2] hover:text-[#2e5bff] hover:bg-[#2e5bff]/10 rounded-full transition-colors duration-200">
            <span>🔔</span>
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
          <Link href="#" className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[12px] shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:translate-x-1">
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

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col lg:ml-64 pt-16 lg:pt-0 min-h-screen pb-24 lg:pb-0">
        
        {/* Top Section */}
        <section className="flex-none bg-[#eef2fc] p-[20px] md:p-[24px] lg:p-[40px] border-b border-[#171f33]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2e5bff]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-[24px] relative z-10">
            <div className="flex items-center justify-between text-[#434656] text-[14px]">
              <div className="flex items-center gap-[4px] flex-wrap">
                <span className="hover:text-[#2e5bff] cursor-pointer transition-colors">Módulo 1</span>
                <span className="text-[16px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
                <span className="text-[#2e5bff] font-bold">Fundamentos Básicos</span>
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
              <h1 className="text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] tracking-[-0.02em] font-bold text-[#0b1326]">
                Variables y Tipos de Datos
              </h1>
              <p className="text-[#434656] text-[16px] md:text-[18px] max-w-2xl leading-relaxed">
                Aprende a almacenar información en memoria y a trabajar con texto, números y valores lógicos en JavaScript.
              </p>
            </div>

            <LessonArea videoSrc="https://www.youtube.com/embed/walAu_skXHA" />
          </div>
        </section>

        {/* Bottom Section: Interactive Practice */}
        <section className="flex-grow bg-white p-[20px] md:p-[24px] lg:p-[40px] relative">
          <div className="max-w-[1000px] mx-auto w-full flex flex-col h-full gap-[24px] relative z-10">
            <div className="flex items-center justify-between mb-[12px]">
              <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1326] flex items-center gap-[12px]">
                Comprueba tu Entendimiento
              </h2>
              <span className="bg-[#2e5bff]/10 border border-[#2e5bff]/20 text-[#2e5bff] px-[12px] py-[4px] rounded-full text-[12px] tracking-[0.1em] font-bold uppercase">
                4 Desafíos
              </span>
            </div>
            
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-[24px] pb-[24px] [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar-track]:bg-[#f4f7ff] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#8e90a2]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#2e5bff]/60"
              style={{ scrollBehavior: 'smooth' }}
            >
              
              {/* Q1: Teoría */}
              <div className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center border shadow-sm rounded-xl p-[24px] flex flex-col transition-colors ${q1.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/30' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Variables</span>
                  {q1.status === 'correct' && <span className="text-[#7cb300]">✓</span>}
                </div>
                <p className="text-[18px] leading-[28px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Cuál es la forma correcta de declarar una variable constante que <strong>no podrá</strong> ser reasignada en el futuro?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['var', 'let', 'const', 'static'].map((opt) => {
                    const isSelected = q1.val === opt;
                    let bgClass = "bg-white border-[#171f33]/10 text-[#434656]";
                    
                    if (q1.status === 'correct') {
                      if (isSelected) bgClass = "bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] shadow-[0_4px_10px_rgba(124,179,0,0.1)] font-bold cursor-not-allowed";
                      else bgClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50 cursor-not-allowed"; // Ocultar visualmente las otras si ya acertó
                    } else {
                      bgClass += " hover:border-[#2e5bff]/50 cursor-pointer";
                      if (isSelected && q1.status === 'incorrect') bgClass = "bg-red-500/10 border-red-500 text-red-500";
                    }

                    return (
                      <label key={opt} className="group relative">
                        <input 
                          type="radio" 
                          name="q1" 
                          className="peer sr-only" 
                          checked={isSelected} 
                          disabled={q1.status === 'correct'} // BLOQUEO ACTIVO
                          onChange={() => handleQ1(opt)} 
                        />
                        <div className={`w-full p-[12px] rounded-lg border font-mono text-[14px] transition-all duration-300 ${bgClass}`}>
                          {opt} x = 10;
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q2: Práctica Terminal */}
              <div className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center shadow-[0_4px_20px_rgba(46,91,255,0.15)] rounded-xl p-[24px] flex flex-col relative overflow-hidden transition-colors ${q2.status === 'correct' ? 'bg-[#15241b] border border-[#7cb300]/50' : 'bg-[#0b1326] border border-[#2e5bff]/30'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2e5bff] to-[#a64aff]"></div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Números</span>
                  {q2.status === 'correct' && <span className="text-[#7cb300]">✓ Completado</span>}
                </div>
                <p className="text-[16px] leading-[24px] text-white/90 mb-[24px] flex-grow">
                  Usa <span className="text-[#a64aff]">let</span> para declarar una variable llamada <span className="text-[#a9f900]">edad</span> y asígnale el número <span className="text-[#a9f900]">25</span>.
                </p>
                
                <div className="flex flex-col gap-[8px] mt-auto">
                  <div className={`flex items-center gap-[8px] p-[12px] rounded-lg border transition-colors ${q2.status === 'correct' ? 'bg-black/20 border-[#7cb300]/30' : 'bg-black/50 border-white/10 focus-within:border-[#a9f900]/50'}`}>
                    <span className="text-[#2e5bff] font-mono font-bold">{'>'}</span>
                    <input 
                      type="text" 
                      value={q2.val}
                      disabled={q2.status === 'correct'} // BLOQUEO ACTIVO
                      onChange={(e) => { setQ2({ val: e.target.value, status: 'idle' }); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkQ2()}
                      placeholder="Escribe tu código aquí..."
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {!q2.status || q2.status !== 'correct' ? (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[12px] text-white/50 font-mono">Presiona Enter o Verificar</span>
                      <button onClick={checkQ2} className="bg-white/10 hover:bg-white/20 text-white px-[16px] py-[6px] rounded-md text-[12px] font-bold uppercase transition-colors">
                        Verificar
                      </button>
                    </div>
                  ) : null}
                  {q2.status === 'incorrect' && <div className="text-red-400 text-[13px] mt-2 flex items-center gap-1">✗ Revisa la sintaxis. Ej: let x = 5</div>}
                </div>
              </div>

              {/* Q3: Teoría */}
              <div className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center border shadow-sm rounded-xl p-[24px] flex flex-col transition-colors ${q3.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/30' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Tipos de Datos</span>
                  {q3.status === 'correct' && <span className="text-[#7cb300]">✓</span>}
                </div>
                <p className="text-[18px] leading-[28px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Qué tipo de dato devuelve el operador <code>typeof</code> cuando evalúas un texto como <code>"Hola Mundo"</code>?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['text', 'string', 'char', 'boolean'].map((opt) => {
                    const isSelected = q3.val === opt;
                    let bgClass = "bg-white border-[#171f33]/10 text-[#434656]";
                    
                    if (q3.status === 'correct') {
                      if (isSelected) bgClass = "bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] shadow-[0_4px_10px_rgba(124,179,0,0.1)] font-bold cursor-not-allowed";
                      else bgClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50 cursor-not-allowed";
                    } else {
                      bgClass += " hover:border-[#2e5bff]/50 cursor-pointer";
                      if (isSelected && q3.status === 'incorrect') bgClass = "bg-red-500/10 border-red-500 text-red-500";
                    }

                    return (
                      <label key={opt} className="group relative">
                        <input 
                          type="radio" 
                          name="q3" 
                          className="peer sr-only" 
                          checked={isSelected} 
                          disabled={q3.status === 'correct'} // BLOQUEO ACTIVO
                          onChange={() => handleQ3(opt)} 
                        />
                        <div className={`w-full p-[12px] rounded-lg border font-mono text-[14px] transition-all duration-300 ${bgClass}`}>
                          "{opt}"
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q4: Práctica Terminal */}
              <div className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center shadow-[0_4px_20px_rgba(166,74,255,0.15)] rounded-xl p-[24px] flex flex-col relative overflow-hidden transition-colors ${q4.status === 'correct' ? 'bg-[#15241b] border border-[#7cb300]/50' : 'bg-[#0b1326] border border-[#a64aff]/30'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a64aff] to-[#2e5bff]"></div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Textos</span>
                  {q4.status === 'correct' && <span className="text-[#7cb300]">✓ Completado</span>}
                </div>
                <p className="text-[16px] leading-[24px] text-white/90 mb-[24px] flex-grow">
                  Usa <span className="text-[#a64aff]">const</span> para declarar una constante llamada <span className="text-[#a9f900]">curso</span> y asígnale el texto <span className="text-[#a9f900]">'NanoCode'</span>.
                </p>
                
                <div className="flex flex-col gap-[8px] mt-auto">
                  <div className={`flex items-center gap-[8px] p-[12px] rounded-lg border transition-colors ${q4.status === 'correct' ? 'bg-black/20 border-[#7cb300]/30' : 'bg-black/50 border-white/10 focus-within:border-[#a9f900]/50'}`}>
                    <span className="text-[#2e5bff] font-mono font-bold">~</span>
                    <input 
                      type="text" 
                      value={q4.val}
                      disabled={q4.status === 'correct'} // BLOQUEO ACTIVO
                      onChange={(e) => { setQ4({ val: e.target.value, status: 'idle' }); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkQ4()}
                      placeholder="Escribe tu código aquí..."
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {!q4.status || q4.status !== 'correct' ? (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[12px] text-white/50 font-mono">Presiona Enter o Verificar</span>
                      <button onClick={checkQ4} className="bg-white/10 hover:bg-white/20 text-white px-[16px] py-[6px] rounded-md text-[12px] font-bold uppercase transition-colors">
                        Verificar
                      </button>
                    </div>
                  ) : null}
                  {q4.status === 'incorrect' && <div className="text-red-400 text-[13px] mt-2 flex items-center gap-1">✗ Recuerda usar comillas para el texto</div>}
                </div>
              </div>

            </div>
            
            {/* CTA Actions MODIFICADO */}
            <div className="mt-auto flex justify-end items-center gap-[24px] pt-[12px] border-t border-[#171f33]/10">
              <Link 
                href={canProceed ? "/module2" : "#"}
                onClick={(e) => {
                  // Si no está todo correcto y no es admin, bloqueamos el clic
                  if (!canProceed) e.preventDefault();
                }}
                className={`text-white font-semibold text-[14px] py-[12px] px-[40px] rounded-lg flex items-center justify-center gap-[8px] transition-all ${
                  isAllCorrect 
                  ? 'bg-[#7cb300] hover:shadow-[0_4px_15px_rgba(124,179,0,0.4)] hover:-translate-y-1' 
                  : canProceed
                    ? 'bg-[#2e5bff] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] hover:-translate-y-1'
                    : 'bg-[#2e5bff] opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                {isAllCorrect ? "¡Lección Completada!" : "Continuar al siguiente módulo"}
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
        {/* ... enlaces del footer ... */}
      </nav>

    </div>
  );
}