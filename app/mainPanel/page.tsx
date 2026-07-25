'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from "next/navigation";

// Interfaz para definir la estructura del progreso
interface ModuleProgress {
  moduleId: number;
  progressPct: number;
  isCompleted: boolean;
}

export default function Dashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progressData, setProgressData] = useState<ModuleProgress[]>([]);
  const [userName, setUserName] = useState("Estudiante");
  const [userRole, setUserRole] = useState<string | null>(null); // <-- 1. Nuevo estado para el rol
  const router = useRouter();

  // Efecto visual del mouse
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 1. Cargar el progreso desde la Base de Datos
  useEffect(() => {
    const fetchProgress = async () => {
      let email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      let name = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
      let role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null; // <-- 2. Leer el rol
      
      if (!email) {
        // Si no hay correo, lo devolvemos al inicio de sesión
        router.push('/sesion'); 
        return;
      }
      
      // Limpieza preventiva por si se guardó la palabra "undefined"
      if (name === "undefined" || name === "null") name = null;
      if (role === "undefined" || role === "null") role = null;
      
      // Asignar los valores a los estados
      setUserRole(role);
      
      if (name) {
        setUserName(name);
      } else {
        const fallbackName = email.split('@')[0];
        setUserName(fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1));
      }

      try {
        const res = await fetch(`/api/progress?email=${email}`);
        const data = await res.json();
        if (data.progress) {
          setProgressData(data.progress);
        }
      } catch (error) {
        console.error("Error cargando progreso:", error);
      }
    };

    fetchProgress();
  }, [router]);

  // 2. Lógica para saber el estado exacto de cada módulo
  const getModuleState = (moduleId: number) => {
    const data = progressData.find(p => p.moduleId === moduleId);
    
    // El Módulo 1 SIEMPRE está desbloqueado
    if (moduleId === 1) {
      if (data?.isCompleted) return { status: 'COMPLETED', pct: 100 };
      return { status: 'IN_PROGRESS', pct: data?.progressPct || 0 };
    }

    // Para los demás módulos, verificamos si el módulo anterior fue completado
    const prevModule = progressData.find(p => p.moduleId === moduleId - 1);
    
    if (prevModule && prevModule.isCompleted) {
      if (data?.isCompleted) return { status: 'COMPLETED', pct: 100 };
      return { status: 'IN_PROGRESS', pct: data?.progressPct || 0 };
    }

    // Si no se cumple lo anterior, está bloqueado
    return { status: 'LOCKED', pct: 0 };
  };

  // 3. Información estática de tus módulos
  const modulesInfo = [
    { id: 1, title: "Fundamentos Básicos", desc: "Variables, tipos de datos, operadores y estructuras de control fundamentales.", route: "/module1" },
    { id: 2, title: "Manipulación del DOM", desc: "Selección de elementos, eventos, modificación de estilos y estructura del documento.", route: "/module2" },
    { id: 3, title: "Asincronía y APIs", desc: "Promesas, async/await, Fetch API y consumo de servicios externos.", route: "/module3" },
    { id: 4, title: "Frameworks y Ecosistema", desc: "Introducción a React.", route: "/module4" },
  ];

  // Encontrar el módulo activo para la tarjeta principal (Featured Card)
  const activeModule = modulesInfo.find(m => getModuleState(m.id).status === 'IN_PROGRESS') || modulesInfo[0];
  const activeModuleState = getModuleState(activeModule.id);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole'); // Asegúrate de limpiar todo
    router.push('/sesion');
  };

  // Íconos SVG reutilizables
  const CheckIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const ClockIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const LockIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;

  return (
    <div className="bg-[#fbfdff] text-[#434656] text-[14px] leading-[20px] selection:bg-[#2e5bff] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Top Navigation Bar (Mobile only) */}
      <header className="fixed top-0 w-full z-50 bg-[#fbfdff]/80 backdrop-blur-md border-b border-[#171f33]/10 shadow-sm flex justify-between items-center px-[20px] h-16 lg:hidden">
        <div className="flex items-center gap-[8px]">
          <span className="font-bold text-[#2e5bff]">{userName}</span>
          <span className="text-[20px] leading-[28px] font-semibold text-[#2e5bff] tracking-tighter">
            NanoCode
          </span>
        </div>
        <div className="flex gap-[12px] text-[#2e5bff]">
          <span>[icono notificaciones]</span>
          <button onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-[18px] h-[18px]">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
            </svg>
          </button>
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
          <a href="#" className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[8px] shadow-[0_4px_15px_rgba(46,91,255,0.2)] active:translate-x-1 transition-all">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg></span>
            <span>Cursos</span>
          </a>
        
       
       
          {/* 3. Renderizado condicional del enlace de Usuarios Registrados */}
          
          {userRole === 'ADMIN' && (
            <a href="/usersRegister" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all">
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></span>
              <span>Usuarios Registrados</span>
            </a>
          )}


          {userRole === 'ADMIN' && (
             <a href="/getCertificate" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></span>
            <span>Certificados</span>
          </a>
          )}
        </nav>
        
        <div className="mt-auto flex flex-col gap-[12px]">
          <button onClick={handleLogout} className="bg-[#2e5bff] text-white py-[10px] px-[20px] rounded-xl font-bold flex items-center justify-center gap-[4px] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:scale-95">
            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg></span> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 p-[20px] md:p-[40px] mt-16 lg:mt-0 max-w-[1200px] mx-auto pb-24 lg:pb-[8px]">
        
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[48px]">
          <div>
            <h1 className="text-[28px] md:text-[36px] leading-[36px] md:leading-[44px] tracking-[-0.02em] font-bold text-[#0b1326]">
              Hola, {userName}!
            </h1>
            <p className="text-[#434656] text-[15px] leading-[24px] mt-[8px]">
              Tu progreso hoy es excepcional. Sigue así.
            </p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          
          {/* Current Course (Featured Card Dinámica) */}
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
                    Módulo {activeModule.id}: {activeModule.title}
                  </h2>
                </div>
              </div>
              <div className="space-y-[8px]">
                <div className="flex justify-between text-[#434656]">
                  <span>Progreso del módulo</span>
                  <span className="font-bold text-[#2e5bff]">{activeModuleState.pct}%</span>
                </div>
                <div className="w-full h-2 bg-[#eef2fc] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7cb300] shadow-[0_0_10px_rgba(124,179,0,0.3)] transition-all duration-700"
                    style={{ width: `${activeModuleState.pct}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-[12px]">
                <button 
                  onClick={() => router.push(activeModule.route)}
                  className="bg-[#2e5bff] text-white py-[10px] px-[24px] rounded-xl font-bold flex items-center gap-[8px] hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:scale-95"
                >
                  Continuar lección <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.007c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg></span>
                </button>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
        
          {/* Renderizado Dinámico del Temario (Módulos 1 al 4) */}
          <section className="md:col-span-12 space-y-[24px]">
            <div className="flex justify-between items-center mt-[24px]">
              <h3 className="text-[20px] leading-[28px] md:text-[28px] md:leading-[36px] font-bold tracking-[-0.02em] text-[#0b1326]">
                Temario del Curso: JavaScript Maestro
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {modulesInfo.map((mod) => {
                const state = getModuleState(mod.id);
                
                // Configurar estilos basados en si está COMPLETADO, EN CURSO, o BLOQUEADO
                let cardStyle = "";
                let iconColor = "";
                let iconSvg = null;
                let labelText = "";
                let labelColor = "";
                let isClickable = true;

                if (state.status === 'COMPLETED') {
                  cardStyle = "border-[#7cb300]/30 bg-white hover:-translate-y-1 shadow-sm cursor-pointer";
                  iconColor = "text-[#7cb300]";
                  iconSvg = CheckIcon;
                  labelText = "COMPLETADO";
                  labelColor = "text-[#7cb300]";
                } else if (state.status === 'IN_PROGRESS') {
                  cardStyle = "border-[#2e5bff]/30 bg-white shadow-[0_4px_15px_rgba(46,91,255,0.1)] hover:-translate-y-1 cursor-pointer";
                  iconColor = "text-[#2e5bff] animate-pulse";
                  iconSvg = ClockIcon;
                  labelText = `EN CURSO (${state.pct}%)`;
                  labelColor = "text-[#2e5bff]";
                } else {
                  // BLOQUEADO
                  // LÓGICA AGREGADA: Si es ADMIN, cambiamos el cursor y permitimos el acceso
                  cardStyle = `opacity-60 grayscale bg-[#f4f7ff] border-[#171f33]/10 ${userRole === 'ADMIN' ? 'cursor-pointer hover:shadow-sm' : 'cursor-not-allowed'}`;
                  iconColor = "text-[#8e90a2]";
                  iconSvg = LockIcon;
                  labelText = userRole === 'ADMIN' ? "BLOQUEADO (ACCESO ADMIN)" : "BLOQUEADO";
                  labelColor = "text-[#8e90a2]";
                  isClickable = userRole === 'ADMIN'; // <-- Aquí está la validación
                }

                return (
                  <div 
                    key={mod.id}
                    onClick={() => isClickable && router.push(mod.route)}
                    onMouseMove={handleMouseMove}
                    className={`p-[20px] rounded-xl border flex flex-col gap-[12px] transition-transform ${cardStyle}`}
                    style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-[#0b1326] text-[16px]">Módulo {mod.id}: {mod.title}</h4>
                      <span className={iconColor}>
                        <span>{iconSvg}</span>
                      </span>
                    </div>
                    <p className={state.status === 'LOCKED' ? "text-[#8e90a2]" : "text-[#434656]"}>
                      {mod.desc}
                    </p>
                    <div className="mt-auto pt-[12px]">
                      <span className={`text-[11px] tracking-[0.1em] font-bold ${labelColor}`}>
                        {labelText}
                      </span>
                    </div>
                  </div>
                );
              })}
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
      
      </nav>
      
    </div>
  );
}