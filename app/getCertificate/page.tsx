'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from "next/navigation";

interface CertificateData {
  certificateId: string;
  studentName: string;
  issueDate: string;
}

export default function VerificadorPage() {
  // Estados visuales y de usuario heredados de tu diseño
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [userName, setUserName] = useState("Estudiante");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Estados propios del buscador de certificados
  const [searchId, setSearchId] = useState('');
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    let email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    let name = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    let role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;

    if (!email) {
      router.push('/sesion');
      return;
    }

    if (name === "undefined" || name === "null") name = null;
    if (role === "undefined" || role === "null") role = null;

    setUserRole(role);
    if (name) {
      setUserName(name);
    } else {
      const fallbackName = email.split('@')[0];
      setUserName(fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    router.push('/sesion');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCertificate(null);
    setIsLoading(true);

    try {
      const formattedId = searchId.toUpperCase().startsWith('NC-') 
        ? searchId.toUpperCase() 
        : `NC-${searchId}`;

      const response = await fetch(`/api/certificate/verify?id=${formattedId}`);
      
      if (!response.ok) {
        throw new Error('No se encontró ningún certificado con este identificador.');
      }

      const data = await response.json();
      setCertificate(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <a href="/mainPanel" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg></span>
            <span>Cursos</span>
          </a>
          
          {/* Active state para Certificados */}
          <a href="/getCertifacte" className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[8px] shadow-[0_4px_15px_rgba(46,91,255,0.2)] active:translate-x-1 transition-all">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></span>
            <span>Certificados</span>
          </a>

          {userRole === 'ADMIN' && (
            <a href="/usersRegister" className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all">
              <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></span>
              <span>Usuarios Registrados</span>
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
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[32px]">
          <div>
            <h1 className="text-[28px] md:text-[36px] leading-[36px] md:leading-[44px] tracking-[-0.02em] font-bold text-[#0b1326]">
              Verificación de Certificados
            </h1>
            <p className="text-[#434656] text-[15px] leading-[24px] mt-[8px]">
              Valida la autenticidad de los certificados emitidos por NanoCode.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          
          {/* Tarjeta del Buscador */}
          <div 
            onMouseMove={handleMouseMove}
            className="md:col-span-12 p-[24px] md:p-[32px] rounded-xl relative overflow-hidden group bg-white shadow-sm border border-[#171f33]/10"
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e5bff]/5 blur-[60px] -mr-16 -mt-16 rounded-full group-hover:bg-[#2e5bff]/10 transition-all"></div>
            
            <form className="relative z-10 flex flex-col sm:flex-row gap-[16px] max-w-2xl mx-auto" onSubmit={handleSearch}>
              <div className="flex-grow">
                <label htmlFor="certId" className="block text-[12px] font-bold text-[#8e90a2] mb-[8px] uppercase tracking-wide">
                  ID del Certificado
                </label>
                <input
                  id="certId"
                  type="text"
                  required
                  className="w-full px-[16px] py-[12px] rounded-xl border border-[#171f33]/20 bg-[#fbfdff] text-[#0b1326] focus:outline-none focus:border-[#2e5bff] focus:ring-1 focus:ring-[#2e5bff] uppercase transition-all"
                  placeholder="Ej: NC-30546776"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-[#2e5bff] text-white py-[12px] px-[32px] rounded-xl font-bold hover:shadow-[0_4px_15px_rgba(46,91,255,0.3)] transition-all active:scale-95 disabled:bg-[#8e90a2] disabled:shadow-none disabled:active:scale-100 h-[48px]"
                >
                  {isLoading ? 'Buscando...' : 'Verificar'}
                </button>
              </div>
            </form>

            {error && (
              <div className="relative z-10 mt-[16px] bg-[#fff0f0] text-[#e03131] p-[16px] rounded-xl text-center text-[14px] font-semibold border border-[#ffc9c9] max-w-2xl mx-auto">
                {error}
              </div>
            )}
          </div>

          {/* Tarjeta del Certificado (Si se encuentra) */}
          {certificate && (
            <div className="md:col-span-12 p-[24px] md:p-[40px] rounded-xl bg-white shadow-sm border border-[#171f33]/10 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="w-full" style={{ fontFamily: 'Arial, sans-serif', color: '#434656', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h1 style={{ color: '#2e5bff', margin: '0', fontSize: '28px' }}>NanoCode</h1>
                  <p style={{ color: '#8e90a2', margin: '5px 0 0 0', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>
                    Acreditación de Conocimiento
                  </p>
                </div>

                <div style={{ backgroundColor: '#fbfdff', border: '2px solid #eef2fc', borderRadius: '16px', padding: '40px 30px', textAlign: 'center', boxShadow: '0 10px 30px rgba(46,91,255,0.05)' }}>
                  <p style={{ fontSize: '16px', color: '#434656', marginBottom: '10px' }}>Se otorga el presente a:</p>
                  
                  <h2 style={{ color: '#0b1326', fontSize: '32px', margin: '10px 0', borderBottom: '2px solid #7cb300', display: 'inline-block', paddingBottom: '5px' }}>
                    {certificate.studentName}
                  </h2>
                  
                  <p style={{ fontSize: '16px', color: '#434656', marginTop: '20px', lineHeight: '1.6' }}>
                    Por haber completado con éxito la ruta de aprendizaje de <strong>Fundamentos Modernos de JavaScript y DOM</strong>, demostrando competencia en lógica de programación, asincronía y el ecosistema moderno.
                  </p>
                  
                  <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eef2fc', paddingTop: '20px' }}>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: 'bold', color: '#2e5bff', margin: '0' }}>Cedula / ID:</p>
                      <p style={{ fontSize: '12px', color: '#8e90a2', margin: '5px 0 0 0' }}>{certificate.certificateId}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 'bold', color: '#2e5bff', margin: '0' }}>Fecha de Emisión:</p>
                      <p style={{ fontSize: '12px', color: '#8e90a2', margin: '5px 0 0 0' }}>
                        {new Date(certificate.issueDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-[24px] flex justify-center">
                   <span className="inline-flex items-center px-[16px] py-[8px] border border-[#7cb300]/30 bg-[#7cb300]/10 text-[#7cb300] rounded-xl text-[14px] font-bold">
                     ✓ Certificado Oficial Verificado en NanoCode
                   </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 w-full lg:hidden bg-[#fbfdff]/90 backdrop-blur-lg border-t border-[#171f33]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-[8px] px-[20px] z-50">
        <a href="/dashboard" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
          </span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">CURSOS</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#2e5bff] scale-110 transition-transform">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          </span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">CERTIFICADOS</span>
        </a>
      </nav>
      
    </div>
  );
}