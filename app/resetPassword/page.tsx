"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // 1. Creamos un estado para guardar el token
  const [token, setToken] = useState<string | null>(null);
  
  const router = useRouter();

  // 2. Usamos JavaScript puro para leer la URL solo en el navegador
  useEffect(() => {
    // window.location.search extrae todo lo que está después del "?" en la URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Falta el token de recuperación. El enlace no es válido.");
    }
  }, []); // El array vacío asegura que esto solo corra una vez al cargar la página

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo restablecer la contraseña');
      }

      setSuccess(true);
      
      // Esperamos 2 segundos para que el usuario lea el mensaje de éxito y redirigimos
      setTimeout(() => {
        router.push('/sesion');
      }, 2500);

    } catch (err: any) {
      console.error("Error en reset-password frontend:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbfdff] text-[#434656] font-sans min-h-screen overflow-x-hidden">
      <main className="flex flex-col md:flex-row min-h-screen w-full">
        
        {/* Left Side: Branding Banner */}
        <section className="hidden md:flex flex-col justify-center items-start w-1/2 p-[64px] bg-[#eef2fc] relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2e5bff]/10 rounded-full blur-[120px]"></div>
          <div className="relative z-10 max-w-lg my-auto">
            <div className="mb-[40px] inline-flex items-center gap-[12px]">
              <span className="text-[30px] leading-[32px] font-semibold text-[#2e5bff] tracking-tight">
                NanoCode
              </span>
            </div>
            <h1 className="text-[48px] leading-[56px] font-bold tracking-tight text-[#0b1326] mb-[24px]">
              Establece tu <span className="text-[#2e5bff]">nueva clave.</span>
            </h1>
            <p className="text-[18px] leading-[28px] text-[#434656] leading-relaxed">
              Crea una contraseña segura y fácil de recordar para proteger tu cuenta y continuar expandiendo tus conocimientos de programación.
            </p>
          </div>
        </section>

        {/* Right Side: Form */}
        <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-[20px] md:px-[64px] bg-white">
          <div className="w-full max-w-[440px]">
            <header className="mb-[40px] text-center md:text-left">
              <h2 className="text-[24px] leading-[32px] font-semibold text-[#0b1326] mb-[4px]">
                Restablecer Contraseña
              </h2>
              <p className="text-[16px] leading-[24px] text-[#434656]">
                Introduce tus nuevos datos de acceso.
              </p>
            </header>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                ¡Contraseña Cambiada! Redirigiéndote al inicio de sesión...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-[24px]">
              {/* Password Field */}
              <div className="space-y-[4px]">
                <label className="text-[12px] leading-[16px] font-bold tracking-[0.1em] uppercase text-[#434656] ml-1" htmlFor="password">
                  Nueva Contraseña
                </label>
                <div className="relative group focus-within:scale-[1.01] transition-transform duration-200">
                  <input
                    className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] transition-all duration-300 placeholder:text-[#8e90a2] outline-none pr-12"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={!!success || !token} // Deshabilitado si no hay token o si ya se cambió
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
                disabled={loading || !!success || !token}
                type="submit"
                className="w-full bg-[#2e5bff] text-white py-[12px] rounded-xl font-bold hover:shadow-lg transition-all mt-[24px] disabled:opacity-50 active:scale-94"
              >
                {loading ? "Actualizando..." : "Actualizar Contraseña"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}