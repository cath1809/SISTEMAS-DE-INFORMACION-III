"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SesionPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Usamos nombres alternativos para engañar al autocompletado del navegador
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginKey: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // AQUÍ IRÁ LA LLAMADA A TU ENDPOINT DE LOGIN
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Mapeamos de vuelta a los nombres que tu API espere
        body: JSON.stringify({
          email: formData.loginEmail,
          password: formData.loginKey
        })
      });
      
      if (!response.ok) throw new Error('Credenciales inválidas');
      const data = await response.json();
      console.log('Login exitoso', data);
      */
      
      console.log("Datos listos para enviar al backend:", formData);
      // Simulación de carga
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // La redirección es mejor hacerla aquí después de que el login sea exitoso
      router.push('/mainPanel');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbfdff] text-[#434656] font-sans selection:bg-[#2e5bff] selection:text-white min-h-screen overflow-x-hidden">
      <main className="flex flex-col md:flex-row min-h-screen w-full">
        
        {/* Left Side: Motivational & Branding (Tema Claro) */}
        <section className="hidden md:flex flex-col justify-center items-start w-1/2 p-[64px] bg-[#eef2fc] relative overflow-hidden">
          {/* Decorative Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2e5bff]/10 rounded-full blur-[120px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-[#a64aff]/10 rounded-full blur-[100px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          
          <div className="relative z-10 max-w-lg my-auto">
            <div className="mb-[40px] inline-flex items-center gap-[12px]">
              {/* Logo */}
              <div className="h-12 w-12 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(46,91,255,0.3)]">
                <span className="text-3xl">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 100 100" 
                    className="w-8 h-8 drop-shadow-[0_0_8px_rgba(46,91,255,0.4)]"
                  >
                    <defs>
                      <linearGradient id="nanoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2e5bff" />
                        <stop offset="100%" stopColor="#b8c3ff" />
                      </linearGradient>
                      <linearGradient id="codeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94db00" />
                        <stop offset="100%" stopColor="#a9f900" />
                      </linearGradient>
                    </defs>
                    
                    {/* Hexágono exterior (Nano) */}
                    <path 
                      d="M50 8 L86.5 29 L86.5 71 L50 92 L13.5 71 L13.5 29 Z" 
                      fill="none" 
                      stroke="url(#nanoGrad)" 
                      strokeWidth="7" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* Símbolos de código < > */}
                    <path 
                      d="M40 36 L25 50 L40 64" 
                      fill="none" 
                      stroke="url(#codeGrad)" 
                      strokeWidth="7" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M60 36 L75 50 L60 64" 
                      fill="none" 
                      stroke="url(#codeGrad)" 
                      strokeWidth="7" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* Núcleo central */}
                    <circle cx="50" cy="50" r="4.5" fill="#dae2fd" />
                  </svg>
                </span>
              </div>
              <span className="text-[30px] leading-[32px] font-semibold text-[#2e5bff] tracking-tight block w-full text-left">
                NanoCode
              </span>
            </div>
            
            <h1 className="text-[48px] leading-[56px] font-bold tracking-tight text-[#0b1326] mb-[24px]">
              Tu carrera evoluciona en <span className="text-[#2e5bff]">tiempo real.</span>
            </h1>
            
            <p className="text-[18px] leading-[28px] text-[#434656] mb-[64px] leading-relaxed">
              Transforma tu futuro 5 minutos a la vez. Únete a una comunidad de desarrolladores que dominan las tecnologías del mañana con precisión y velocidad.
            </p>
            
            <div className="space-y-[24px]">
              <div className="flex items-center gap-[24px]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#171f33]/5 shadow-sm flex items-center justify-center text-[#7cb300]">
                  <span className="text-xl">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 -960 960 960" 
                      fill="currentColor" 
                      className="w-[18px] h-[18px]"
                    >
                      <path d="m320-80 40-280H200l240-520h200l-40 280h160L520-80H320Z"/>
                    </svg>
                  </span>
                </div>
                <span className="text-[16px] leading-[24px] text-[#0b1326] font-medium">
                  Micro-learning de alto impacto
                </span>
              </div>
              <div className="flex items-center gap-[24px]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#171f33]/5 shadow-sm flex items-center justify-center text-[#2e5bff]">
                  <span className="text-xl"> 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 -960 960 960" 
                      fill="currentColor" 
                      className="w-[32px] h-[32px]"
                    >
                      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm120-60 56-56-84-84 84-84-56-56-140 140 140 140Zm160-20v80h240v-80H440Z"/>
                    </svg>
                  </span>
                </div>
                <span className="text-[16px] leading-[24px] text-[#0b1326] font-medium">
                  Entorno de desarrollo real integrado
                </span>
              </div>
            </div>
          </div>
          
          {/* Footer-like text for branding */}
          <div className="absolute bottom-[24px] left-[64px] text-[#434656]/50 text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} NANOCODE
          </div>
        </section>

        {/* Right Side: Login Form (Tema Claro) */}
        <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-[20px] md:px-[64px] bg-white">
          
          {/* Mobile Branding Only */}
          <div className="md:hidden mb-[40px] flex flex-col items-center">
            <div className="h-10 mb-[12px] flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(46,91,255,0.3)]">
               <span className="text-2xl">
                 <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 100 100" 
                    className="w-8 h-8 drop-shadow-[0_0_8px_rgba(46,91,255,0.4)]"
                  >
                    <defs>
                      <linearGradient id="nanoGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2e5bff" />
                        <stop offset="100%" stopColor="#b8c3ff" />
                      </linearGradient>
                      <linearGradient id="codeGradMobile" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94db00" />
                        <stop offset="100%" stopColor="#a9f900" />
                      </linearGradient>
                    </defs>
                    <path d="M50 8 L86.5 29 L86.5 71 L50 92 L13.5 71 L13.5 29 Z" fill="none" stroke="url(#nanoGradMobile)" strokeWidth="7" strokeLinejoin="round" />
                    <path d="M40 36 L25 50 L40 64" fill="none" stroke="url(#codeGradMobile)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M60 36 L75 50 L60 64" fill="none" stroke="url(#codeGradMobile)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="50" r="4.5" fill="#dae2fd" />
                  </svg>
               </span>
            </div>
            <span className="text-[24px] leading-[32px] font-semibold text-[#2e5bff]">
              NanoCode
            </span>
          </div>
          
          <div className="w-full max-w-[440px]">
            <header className="mb-[64px] text-center md:text-left">
              <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1326] mb-[4px]">
                Bienvenido de nuevo
              </h2>
              <p className="text-[16px] leading-[24px] text-[#434656]">
                Continúa tu viaje de aprendizaje hoy.
              </p>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-[24px]">
              {/* --- TRAMPAS PARA EL NAVEGADOR --- */}
              <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
              <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />
              
              {/* Email Field */}
              <div className="space-y-[4px]">
                <label className="text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase text-[#434656] ml-1" htmlFor="loginEmail">
                  Correo Electrónico
                </label>
                <div className="relative group focus-within:scale-[1.01] transition-transform duration-200">
                  <input
                    className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] transition-all duration-300 placeholder:text-[#8e90a2] outline-none"
                    id="loginEmail"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleChange}
                    placeholder="nombre@ejemplo.com"
                    type="email"
                    // required
                    autoComplete="off"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e90a2] group-focus-within:text-[#2e5bff] transition-colors group-focus-within:drop-shadow-[0_0_8px_rgba(46,91,255,0.3)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-[4px]">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase text-[#434656]" htmlFor="loginKey">
                    Contraseña
                  </label>
                </div>
                <div className="relative group focus-within:scale-[1.01] transition-transform duration-200">
                  <input
                    className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] transition-all duration-300 placeholder:text-[#8e90a2] outline-none pr-12"
                    id="loginKey"
                    name="loginKey"
                    value={formData.loginKey}
                    onChange={handleChange}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    // required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e90a2] hover:text-[#2e5bff] group-focus-within:text-[#2e5bff] transition-colors"
                  >
                    <span className="text-xl">
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {/* Pupila parcial */}
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          {/* Arco superior parcial */}
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          {/* Arco inferior parcial */}
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                          {/* Línea diagonal de tachado */}
                          <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {/* Forma del ojo */}
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          {/* Pupila */}
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Primary Action */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#2e5bff] text-white text-[16px] leading-[24px] py-[12px] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(46,91,255,0.4)] hover:opacity-90 active:scale-95 transition-all duration-200 mt-[24px] disabled:opacity-50"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="relative my-[64px] text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#171f33]/10"></div>
              </div>
            </div>

            <p className="mt-[64px] text-center text-[16px] leading-[24px] text-[#434656]">
              ¿No tienes una cuenta?{" "}
              <button onClick={() => router.push('./register')} className="text-[#2e5bff] font-bold hover:underline ml-1 cursor-pointer">
                Regístrate gratis
              </button>
            </p>
          </div>
        </section>
      </main>

      {/* Floating Atmosphere Elements */}
      <div className="fixed top-1/4 right-10 w-2 h-2 bg-[#7cb300] rounded-full animate-pulse blur-[1px] hidden md:block"></div>
      <div className="fixed bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#2e5bff] rounded-full animate-ping hidden md:block"></div>
    </div>
  );
}