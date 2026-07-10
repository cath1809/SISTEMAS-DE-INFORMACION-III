'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import LessonArea from '../components/LessonArea';

export default function LessonFour() {
  // Estados para validar las respuestas en tiempo real
  const [q1, setQ1] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q2, setQ2] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q3, setQ3] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });
  const [q4, setQ4] = useState<{ val: string; status: 'idle' | 'correct' | 'incorrect' }>({ val: '', status: 'idle' });

  // NUEVO: Estado para verificar el rol del usuario
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // NUEVO: Estados para el manejo del Certificado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingCert, setLoadingCert] = useState(false);

  // 1. RECUPERAR RESPUESTAS Y ROL AL CARGAR LA PÁGINA
  useEffect(() => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null; 
    
    if (role) setUserRole(role);
    if (!userEmail) return;

    // Buscamos si este usuario ya tiene respuestas guardadas para el módulo 4
    const cachedAnswers = localStorage.getItem(`mod4_answers_${userEmail}`);
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
      localStorage.setItem(`mod4_answers_${userEmail}`, JSON.stringify({ q1, q2, q3, q4 }));
    }
  }, [q1, q2, q3, q4]);

  // Lógica de Validación Módulo 4 (Con prevención si ya está correcto)
  const handleQ1 = (value: string) => {
    if (q1.status === 'correct') return; // Bloqueo por éxito
    const isCorrect = value === 'Componente';
    setQ1({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ2 = () => {
    if (q2.status === 'correct' || !q2.val) return; // Bloqueo por éxito
    // Eliminamos espacios y pasamos a minúsculas para evaluar const [edad, setEdad] = useState(0)
    const normalized = q2.val.trim().toLowerCase().replace(/\s+/g, '').replace(/;$/, '');
    const isCorrect = normalized === "const[edad,setedad]=usestate(0)";
    setQ2(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  const handleQ3 = (value: string) => {
    if (q3.status === 'correct') return; // Bloqueo por éxito
    const isCorrect = value === 'JSX';
    setQ3({ val: value, status: isCorrect ? 'correct' : 'incorrect' });
  };

  const checkQ4 = () => {
    if (q4.status === 'correct' || !q4.val) return; // Bloqueo por éxito
    // Eliminamos espacios para evaluar <p>{usuario}</p>
    const normalized = q4.val.trim().toLowerCase().replace(/\s+/g, '');
    const isCorrect = normalized === "<p>{usuario}</p>";
    setQ4(prev => ({ ...prev, status: isCorrect ? 'correct' : 'incorrect' }));
  };

  // NUEVO: Lógica combinada para saber si todo está correcto y si puede continuar
  const isAllCorrect = q1.status === 'correct' && q2.status === 'correct' && q3.status === 'correct' && q4.status === 'correct';
  const canProceed = isAllCorrect || userRole === 'ADMIN';

  // Calcular el progreso dinámico (0 a 100)
  const currentProgress = (() => {
    let count = 0;
    if (q1.status === 'correct') count++;
    if (q2.status === 'correct') count++;
    if (q3.status === 'correct') count++;
    if (q4.status === 'correct') count++;
    return (count / 4) * 100;
  })();

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
            moduleId: 4, // Identificador de este módulo
            progressPct: currentProgress 
          })
        });
      } catch (error) {
        console.error("Error de red al guardar el progreso:", error);
      }
    };

    saveProgressToDB();
  }, [currentProgress]);

  // NUEVO: Función para solicitar el certificado
  const handleGetCertificate = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canProceed) return;

    setLoadingCert(true);
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;

    try {
      const response = await fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, name: userName })
      });

      if (!response.ok) throw new Error('Error enviando certificado');
      
      // Abrimos el modal de éxito
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al enviar el certificado. Intenta de nuevo.");
    } finally {
      setLoadingCert(false);
    }
  };

  // Clases de utilidad estandarizadas para mantener las tarjetas simétricas
  const cardBaseClass = "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[420px] flex-none snap-center p-[24px] rounded-xl border flex flex-col relative overflow-hidden transition-colors duration-500 shadow-sm";

  return (
    <div className="antialiased min-h-screen flex flex-col lg:flex-row font-sans text-[16px] leading-[24px] bg-[#fbfdff] text-[#0b1326] relative">
      
      {/* --- MODAL DE CERTIFICADO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b1326]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-[32px] md:p-[48px] max-w-md w-full shadow-[0_10px_40px_rgba(46,91,255,0.2)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2e5bff] to-[#7cb300]"></div>
            
            <div className="w-20 h-20 bg-[#f4f7ff] rounded-full flex items-center justify-center mx-auto mb-[24px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[#7cb300]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            
            <h2 className="text-[28px] font-bold text-[#0b1326] mb-[12px] tracking-tight">¡Felicidades!</h2>
            <p className="text-[16px] text-[#434656] leading-relaxed mb-[32px]">
              Tu certificado de finalización ha sido generado y enviado a tu correo electrónico. Sigue construyendo el futuro.
            </p>
            
            <Link 
              href="/mainPanel"
              className="block w-full py-[14px] bg-[#2e5bff] text-white font-bold rounded-xl hover:bg-[#2e5bff]/90 hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all"
            >
              Volver al Panel Principal
            </Link>
          </div>
        </div>
      )}
      {/* --- FIN MODAL --- */}

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

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col lg:ml-64 pt-16 lg:pt-0 min-h-screen pb-24 lg:pb-0">
        
        {/* Top Section */}
        <section className="flex-none bg-[#eef2fc] p-[20px] md:p-[24px] lg:p-[40px] border-b border-[#171f33]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2e5bff]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-[24px] relative z-10">
            <div className="flex items-center justify-between text-[#434656] text-[14px]">
              <div className="flex items-center gap-[4px] flex-wrap">
                <span className="hover:text-[#2e5bff] cursor-pointer transition-colors">Módulo 4</span>
                <span className="text-[16px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
                <span className="text-[#2e5bff] font-bold">Introducción a React</span>
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
                Introducción a React
              </h1>
              <p className="text-[#434656] text-[16px] md:text-[18px] max-w-2xl leading-relaxed">
                Aprende los fundamentos de React: creación de componentes, sintaxis JSX y el uso de hooks como useState para crear interfaces web dinámicas.
              </p>
            </div>

            {/* Video introductorio a React */}
            <LessonArea videoSrc="https://www.youtube.com/embed/yIr_1CasXkM" />
       
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
            
            {/* Horizontal Scroll Container */}
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-[24px] pb-[24px] [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar-track]:bg-[#f4f7ff] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#8e90a2]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#2e5bff]/60"
              style={{ scrollBehavior: 'smooth' }}
            >
              
              {/* Q1: Teoría - Componentes */}
              <div className={`${cardBaseClass} ${q1.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/30' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Arquitectura</span>
                  {q1.status === 'correct' && <span className="text-[#7cb300] font-bold">✓</span>}
                </div>
                <p className="text-[18px] leading-[28px] text-[#0b1326] mb-[24px] flex-grow">
                  ¿Cuál es la pieza fundamental, independiente y reutilizable con la que se construyen las interfaces de usuario en React?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['Plantilla', 'Componente', 'Controlador', 'Etiqueta'].map((opt) => {
                    const isSelected = q1.val === opt;
                    let style = "bg-white border-[#171f33]/10 text-[#434656] hover:border-[#2e5bff]/50";
                    
                    if (q1.status === 'correct') {
                      style = isSelected ? "bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] shadow-[0_4px_10px_rgba(124,179,0,0.1)] font-bold cursor-not-allowed" : "opacity-40 grayscale cursor-not-allowed"; 
                    } else if (isSelected && q1.status === 'incorrect') {
                      style = "bg-red-500/10 border-red-500 text-red-500";
                    }

                    return (
                      <label key={opt} className="group relative cursor-pointer">
                        <input 
                          type="radio" 
                          name="q1" 
                          className="peer sr-only" 
                          checked={isSelected} 
                          disabled={q1.status === 'correct'} 
                          onChange={() => handleQ1(opt)} 
                        />
                        <div className={`w-full p-[14px] rounded-lg border font-mono text-[14px] transition-all duration-300 ${style}`}>
                          {opt}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q2: Práctica Terminal - useState */}
              <div className={`${cardBaseClass} ${q2.status === 'correct' ? 'bg-[#15241b] border-[#7cb300]/50' : 'bg-[#0b1326] border-[#2e5bff]/30'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Hooks</span>
                  {q2.status === 'correct' && <span className="text-[#7cb300] font-bold">✓ ÉXITO</span>}
                </div>
                <p className="text-[17px] leading-relaxed text-white/90 mb-[24px] flex-grow">
                  Usa el hook de estado de React. Declara una constante estructurada para <span className="text-[#a64aff]">edad</span> y <span className="text-[#a64aff]">setEdad</span>, iniciada en <span className="text-[#a9f900]">0</span>.
                </p>
                
                <div className="flex flex-col gap-[12px] mt-auto">
                  <div className={`flex items-center gap-[10px] p-[14px] rounded-lg border transition-colors ${q2.status === 'correct' ? 'bg-black/20 border-[#7cb300]/30' : 'bg-black/50 border-white/10 focus-within:border-[#a9f900]/50'}`}>
                    <span className="text-[#2e5bff] font-mono font-bold">{'>'}</span>
                    <input 
                      type="text" 
                      value={q2.val}
                      disabled={q2.status === 'correct'} 
                      onChange={(e) => { setQ2({ val: e.target.value, status: 'idle' }); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkQ2()}
                      placeholder="const [..., ...] = ..."
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {q2.status !== 'correct' && (
                    <button onClick={checkQ2} className="w-full py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all text-[12px]">
                      VERIFICAR
                    </button>
                  )}
                  {q2.status === 'incorrect' && <p className="text-red-400 text-[12px] text-center">✗ Pista: const [edad, setEdad] = useState(0)</p>}
                </div>
              </div>

              {/* Q3: Teoría - JSX */}
              <div className={`${cardBaseClass} ${q3.status === 'correct' ? 'bg-[#7cb300]/5 border-[#7cb300]/30' : 'bg-[#fbfdff] border-[#171f33]/10'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#8e90a2] tracking-widest uppercase block">Teoría • Sintaxis</span>
                  {q3.status === 'correct' && <span className="text-[#7cb300] font-bold">✓</span>}
                </div>
                <p className="text-[18px] leading-relaxed text-[#0b1326] mb-[24px] flex-grow">
                  ¿Cómo se llama la extensión de sintaxis de JavaScript que React utiliza para permitirte escribir código similar a HTML directamente dentro de JS?
                </p>
                <div className="flex flex-col gap-[12px] mt-auto">
                  {['HTML5', 'JSX', 'ReactXML', 'TSX'].map((opt) => {
                    const isSelected = q3.val === opt;
                    let style = "bg-white border-[#171f33]/10 text-[#434656] hover:border-[#2e5bff]/50";
                    
                    if (q3.status === 'correct') {
                      style = isSelected ? "bg-[#7cb300]/10 border-[#7cb300] text-[#7cb300] font-bold cursor-not-allowed" : "opacity-40 grayscale cursor-not-allowed";
                    } else if (isSelected && q3.status === 'incorrect') {
                      style = "bg-red-500/10 border-red-500 text-red-500";
                    }

                    return (
                      <label key={opt} className="group relative cursor-pointer">
                        <input 
                          type="radio" 
                          name="q3" 
                          className="peer sr-only" 
                          checked={isSelected} 
                          disabled={q3.status === 'correct'} 
                          onChange={() => handleQ3(opt)} 
                        />
                        <div className={`w-full p-[14px] rounded-lg border font-mono text-[14px] transition-all duration-300 ${style}`}>
                          {opt}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q4: Práctica Terminal - Render JSX */}
              <div className={`${cardBaseClass} ${q4.status === 'correct' ? 'bg-[#15241b] border-[#7cb300]/50' : 'bg-[#0b1326] border-[#a64aff]/30'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-bold text-[#a9f900] tracking-widest uppercase block">Práctica • Render JSX</span>
                  {q4.status === 'correct' && <span className="text-[#7cb300] font-bold">✓ ÉXITO</span>}
                </div>
                <p className="text-[17px] leading-relaxed text-white/90 mb-[24px] flex-grow">
                  Escribe la sintaxis exacta en JSX para mostrar dinámicamente una variable de JavaScript llamada <span className="text-[#a64aff]">usuario</span> dentro de una etiqueta <span className="text-[#a9f900]">&lt;p&gt;</span>.
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
                      placeholder="Escribe tu JSX aquí..."
                      className="bg-transparent text-[#a9f900] font-mono text-[14px] w-full outline-none placeholder:text-white/20 disabled:opacity-80"
                    />
                  </div>
                  {q4.status !== 'correct' && (
                    <button onClick={checkQ4} className="w-full py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all text-[12px]">
                      VERIFICAR
                    </button>
                  )}
                  {q4.status === 'incorrect' && <p className="text-red-400 text-[12px] text-center">✗ Recuerda usar llaves para variables JS en JSX</p>}
                </div>
              </div>

            </div>
            
            {/* CTA Actions MODIFICADO */}
            <div className="mt-auto flex justify-between items-center pt-6 border-t border-[#171f33]/10">
              {/* Botón para regresar al módulo anterior (Módulo 3) */}
              <Link 
                href="/module3" 
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

              {/* Botón FINAL para Obtener Certificado */}
              <button 
                onClick={handleGetCertificate}
                disabled={!canProceed || loadingCert}
                className={`text-white font-semibold text-[14px] py-[12px] px-[24px] md:px-[40px] rounded-xl flex items-center justify-center gap-[8px] transition-all shadow-md outline-none ${
                  isAllCorrect 
                  ? 'bg-[#a64aff] hover:scale-105 hover:shadow-[0_4px_20px_rgba(166,74,255,0.4)]' 
                  : canProceed
                    ? 'bg-[#a64aff] hover:bg-[#a64aff]/90 hover:scale-105'
                    : 'bg-[#a64aff] opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                <span className="hidden md:inline">
                  {loadingCert ? "Generando..." : "Obtener Certificado"}
                </span>
                <span className="md:hidden">
                  {loadingCert ? "..." : "Certificado"}
                </span>
                <span className="text-[18px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </span>
              </button>
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