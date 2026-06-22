"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Paso 1: Email, Paso 2: Código y Nueva Clave
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const router = useRouter();

  // Enviar correo para solicitar el código de 6 dígitos
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al solicitar el código');

      setSuccessMessage("Código enviado. Por favor revisa tu bandeja de entrada.");
      setStep(2); // Avanzamos al paso del código PIN
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Enviar el código junto con la nueva contraseña para impactar la BD
  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al validar el código');

      setSuccessMessage("¡Contraseña restablecida con éxito! Redirigiéndote...");
      setTimeout(() => {
        router.push('/sesion');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbfdff] text-[#434656] font-sans min-h-screen overflow-x-hidden">
      <main className="flex flex-col md:flex-row min-h-screen w-full">
        
        {/* Left Side: Branding */}
        <section className="hidden md:flex flex-col justify-center items-start w-1/2 p-[64px] bg-[#eef2fc] relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2e5bff]/10 rounded-full blur-[120px]"></div>
          <div className="relative z-10 max-w-lg my-auto">
            <span className="text-[30px] font-semibold text-[#2e5bff] block mb-6">NanoCode</span>
            <h1 className="text-[48px] leading-[56px] font-bold tracking-tight text-[#0b1326] mb-[24px]">
              Protección y <span className="text-[#2e5bff]">seguridad.</span>
            </h1>
            <p className="text-[18px] text-[#434656] leading-relaxed">
              Verifica tu identidad mediante el código seguro de 6 dígitos para actualizar tus accesos de forma inmediata.
            </p>
          </div>
        </section>

        {/* Right Side: Dynamic Form */}
        <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-[20px] md:px-[64px] bg-white">
          <div className="w-full max-w-[440px]">
            <header className="mb-[40px] text-center md:text-left">
              <h2 className="text-[24px] font-semibold text-[#0b1326] mb-[4px]">
                {step === 1 ? "Recuperar Contraseña" : "Verificación de Código"}
              </h2>
              <p className="text-[16px] text-[#434656]">
                {step === 1 ? "Introduce tu email de registro." : "Ingresa el PIN enviado a tu correo junto a tu nueva contraseña."}
              </p>
            </header>

            {error && <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
            {successMessage && <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">{successMessage}</div>}

            {step === 1 ? (
              /* PASO 1: SOLICITAR CÓDIGO */
              <form onSubmit={handleRequestCode} className="space-y-[24px]">
                <div className="space-y-[4px]">
                  <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#434656]" htmlFor="email">Correo Electrónico</label>
                  <input
                    className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] outline-none transition-all"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-[#2e5bff] text-white py-[12px] rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? "Enviando..." : "Enviar código de verificación"}
                </button>
              </form>
            ) : (
              /* PASO 2: VERIFICAR PIN Y CAMBIAR CONTRASEÑA */
              <form onSubmit={handleVerifyAndReset} className="space-y-[24px]">
                <div className="space-y-[4px]">
                  <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#434656]" htmlFor="code">Código de 6 Dígitos</label>
                  <input
                    className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] text-center font-bold tracking-[0.3em] text-lg focus:border-[#2e5bff] outline-none transition-all"
                    id="code"
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    required
                  />
                </div>

                <div className="space-y-[4px]">
                  <label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#434656]" htmlFor="password">Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      className="w-full bg-[#fbfdff] border border-[#171f33]/10 text-[#0b1326] rounded-xl px-[24px] py-[12px] focus:border-[#2e5bff] outline-none transition-all pr-12"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8e90a2] hover:text-[#2e5bff]">
                      {showPassword ? "Ocultar" : "Ver"}
                    </button>
                  </div>
                </div>

                <button disabled={loading} type="submit" className="w-full bg-[#2e5bff] text-white py-[12px] rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50">
                  {loading ? "Restableciendo..." : "Verificar y Cambiar Contraseña"}
                </button>
              </form>
            )}

            <p className="mt-[40px] text-center text-[#434656]">
              <button onClick={() => { setStep(1); setError(null); setSuccessMessage(null); }} className="text-sm text-[#8e90a2] hover:text-[#2e5bff] block mx-auto mb-2">
                {step === 2 && "← Volver a ingresar correo"}
              </button>
              Volver al <button onClick={() => router.push('/sesion')} className="text-[#2e5bff] font-bold hover:underline">Inicio de sesión</button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}