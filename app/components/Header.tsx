import React, { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-[#fbfdff]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#171f33]/10 shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-5 md:px-8 max-w-[1200px] mx-auto h-16">
        {/* Extremo izquierdo */}
        <div className="font-sora text-2xl font-bold text-[#2e5bff] flex items-center gap-1">
          NanoCode
        </div>
        
        {/* Extremo derecho (recibe el botón o cualquier otro elemento) */}
        <div>
          {children}
        </div>
      </div>
    </header>
  );
}