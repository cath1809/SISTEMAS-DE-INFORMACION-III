"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SesionPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
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
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.loginEmail,
          password: formData.loginKey
        })
      });
      
      const data = await response.json();

      if (!response.ok)  return setError("Credenciales Inválidas");
      localStorage.setItem('userEmail', formData.loginEmail);
      localStorage.setItem('userName', data.user.name); // <-- Agrega esta línea clave
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userCedula', data.user.cedula);
      
      router.push('/mainPanel');
      
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbfdff] text-[#434656] font-sans selection:bg-[#2e5bff] selection:text-white min-h-screen overflow-x-hidden">
      <main className="flex flex-col md:flex-row min-h-screen w-full">
        
        {/* Left Side: Motivational & Branding (Tema Claro) */}
        <section className="hidden md:flex flex-col justify-center items-start w-1/2 p-[64px] bg-[#eef2fc] relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2e5bff]/10 rounded-full blur-[120px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-[#a64aff]/10 rounded-full blur-[100px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          
          <div className="relative z-10 max-w-lg my-auto">
            <div className="mb-[40px] inline-flex items-center gap-[12px]">
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
                    <path d="M50 8 L86.5 29 L86.5 71 L50 92 L13.5 71 L13.5 29 Z" fill="none" stroke="url(#nanoGrad)" strokeWidth="7" strokeLinejoin="round" />
                    <path d="M40 36 L25 50 L40 64" fill="none" stroke="url(#codeGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M60 36 L75 50 L60 64" fill="none" stroke="url(#codeGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
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
          </div>
          
          <div className="absolute bottom-[24px] left-[64px] text-[#434656]/50 text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} NANOCODE
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-[20px] md:px-[64px] bg-white">
          <div className="w-full max-w-[440px]">
            <header className="mb-[64px] text-center md:text-left">
              <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1326] mb-[4px]">
                Bienvenido de nuevo
              </h2>
              <p className="text-[16px] leading-[24px] text-[#434656]">
                Continúa tu viaje de aprendizaje hoy.
              </p>
            </header>
            
            {/* Contenedor dinámico de alertas de error */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-[24px]">
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
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password Field modificado */}
              <div className="space-y-[4px]">
                {/* Contenedor Flex para Label y Botón de Recuperación */}
                <div className="flex justify-between items-center ml-1 mb-1">
                  <label className="text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase text-[#434656]" htmlFor="loginKey">
                    Contraseña
                  </label>
                  <button 
                    type="button"
                    onClick={() => router.push('/forgotPassword')}
                    className="text-[12px] font-semibold text-[#2e5bff] hover:underline transition-all outline-none focus:ring-2 focus:ring-[#2e5bff]/50 rounded-sm"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
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
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#8e90a2] hover:text-[#2e5bff] transition-colors"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="w-full bg-[#2e5bff] text-white py-[12px] rounded-xl font-bold hover:shadow-lg transition-all mt-[24px] disabled:opacity-50 active:scale-[0.99]"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <p className="mt-[64px] text-center text-[#434656]">
              ¿No tienes una cuenta?{" "}
              <button onClick={() => router.push('./register')} className="text-[#2e5bff] font-bold hover:underline ml-1">
                Regístrate gratis
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}