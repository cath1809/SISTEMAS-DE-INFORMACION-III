'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

// Estructura del Usuario
interface User {
  id: string;
  name: string;
  email: string;
  cedula: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export default function RegisteredUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para la interfaz general
  const [userName, setUserName] = useState("Admin");
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const router = useRouter();

  // 1. Cargar los usuarios y validar sesión al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      let email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      let name = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
      let role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;

      // Limpieza preventiva
      if (name === "undefined" || name === "null") name = null;
      if (role === "undefined" || role === "null") role = null;

      // Validación de seguridad extra en el frontend
      if (role !== 'ADMIN') {
        router.push('/mainPanel'); // Expulsar si no es admin
        return;
      }

      setUserRole(role);
      if (name) {
        setUserName(name);
      } else if (email) {
        const fallbackName = email.split('@')[0];
        setUserName(fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1));
      }

      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  // 2. Función para actualizar el rol en la base de datos
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Actualización optimista
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole as 'USER' | 'ADMIN' } : user));

      const response = await fetch('/api/users/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el rol');
      }
    } catch (err: any) {
      console.error(err);
      alert("Hubo un error al cambiar el rol. Recarga la página.");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    router.push('/sesion');
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
          {/* Cursos (Inactivo) */}
          <a href="#" onClick={() => router.push('/mainPanel')} className="text-[#434656] flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-[#2e5bff]/10 hover:text-[#2e5bff] rounded-xl active:translate-x-1 transition-all">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg></span>
            <span>Cursos</span>
          </a>
       
          {/* Usuarios Registrados (ACTIVO) */}
          {userRole === 'ADMIN' && (
            <a href="#" className="bg-[#2e5bff] text-white rounded-xl flex items-center gap-[8px] px-[12px] py-[8px] shadow-[0_4px_15px_rgba(46,91,255,0.2)] active:translate-x-1 transition-all">
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

      {/* Main Content Canvas (Igual que el Dashboard) */}
      <main className="lg:ml-64 p-[20px] md:p-[40px] mt-16 lg:mt-0 max-w-[1200px] mx-auto pb-24 lg:pb-[8px]">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[40px]">
          <div>
            <h1 className="text-[28px] md:text-[36px] leading-[36px] md:leading-[44px] tracking-[-0.02em] font-bold text-[#0b1326]">
              Gestión de Usuarios
            </h1>
            <p className="text-[#434656] text-[15px] leading-[24px] mt-[8px]">
              Administra los accesos y roles de la plataforma NanoCode.
            </p>
          </div>
          <button 
            onClick={() => router.push('/mainPanel')}
            className="bg-[#f4f7ff] text-[#2e5bff] py-[10px] px-[20px] rounded-xl font-medium border border-[#2e5bff]/20 hover:bg-[#eef2fc] transition-all self-start md:self-auto"
          >
            Volver al Panel
          </button>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Tabla integrada en el grid/bento style */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#171f33]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f4f7ff] border-b border-[#171f33]/10">
                  <th className="py-[16px] px-[24px] text-[12px] font-bold tracking-[0.1em] uppercase text-[#8e90a2]">Nombre</th>
                  <th className="py-[16px] px-[24px] text-[12px] font-bold tracking-[0.1em] uppercase text-[#8e90a2]">Cédula</th>
                  <th className="py-[16px] px-[24px] text-[12px] font-bold tracking-[0.1em] uppercase text-[#8e90a2]">Email</th>
                  <th className="py-[16px] px-[24px] text-[12px] font-bold tracking-[0.1em] uppercase text-[#8e90a2]">Fecha Registro</th>
                  <th className="py-[16px] px-[24px] text-[12px] font-bold tracking-[0.1em] uppercase text-[#8e90a2]">Rol de Acceso</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-[64px] text-center text-[#8e90a2] font-medium animate-pulse">
                      Cargando base de datos...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-[64px] text-center text-[#8e90a2] font-medium">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-[#171f33]/5 hover:bg-[#fbfdff] transition-colors">
                      <td className="py-[20px] px-[24px] font-semibold text-[#0b1326]">{user.name}</td>
                      <td className="py-[20px] px-[24px] font-medium text-[#434656]">{user.cedula || 'N/A'}</td>
                      <td className="py-[20px] px-[24px] text-[#434656]">{user.email}</td>
                      <td className="py-[20px] px-[24px] text-[#434656]">
                        {new Date(user.createdAt).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-[20px] px-[24px]">
                        <div className="relative inline-block w-full max-w-[150px]">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className={`w-full appearance-none rounded-xl px-[16px] py-[10px] text-[13px] font-bold outline-none cursor-pointer border transition-all ${
                              user.role === 'ADMIN' 
                                ? 'bg-[#2e5bff]/10 text-[#2e5bff] border-[#2e5bff]/20 hover:bg-[#2e5bff]/20' 
                                : 'bg-[#f4f7ff] text-[#434656] border-[#171f33]/10 hover:bg-[#eef2fc]'
                            }`}
                          >
                            <option value="USER">USUARIO</option>
                            <option value="ADMIN">ADMINISTRADOR</option>
                          </select>
                          {/* Ícono de flecha personalizado para el select */}
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8e90a2]">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="fixed bottom-0 w-full lg:hidden bg-[#fbfdff]/90 backdrop-blur-lg border-t border-[#171f33]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-[8px] px-[20px] z-50">
        <a href="#" onClick={() => router.push('/mainPanel')} className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>[icono escuela]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">CURSOS</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#8e90a2] active:bg-[#2e5bff]/10 hover:text-[#2e5bff] transition-all p-[4px] rounded-lg">
          <span>[icono terminal]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">PRÁCTICA</span>
        </a>
        <a href="#" className="flex flex-col items-center text-[#2e5bff] scale-110 transition-transform">
          <span>[icono admin]</span>
          <span className="text-[10px] tracking-[0.1em] font-bold mt-[4px]">GESTIÓN</span>
        </a>
      </nav>
      
    </div>
  );
}