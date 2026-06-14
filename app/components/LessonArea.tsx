"use client";

import React, { useState } from "react";
import VideoPlayer from "./videoPLayer";
import TerminalChallenge from "./TerminalChallenger";
import { Play } from "lucide-react";

interface LessonAreaProps {
  videoSrc: string; // ej. "https://www.youtube.com/embed/dQw4w9WgXcQ"
}

const LessonArea: React.FC<LessonAreaProps> = ({ videoSrc }) => {
  const [challengeStarted, setChallengeStarted] = useState(false);

  return (
    <section className="mx-auto w-full px-4 py-8 flex flex-col items-center justify-center">
      {/* Contenedor del vídeo centrado, ahora con estilo de tarjeta clara */}
      <div className="w-full max-w-5xl bg-white p-2 rounded-2xl shadow-sm border border-[#171f33]/10">
        <VideoPlayer src={videoSrc} title="Módulo 1 - Variables y Tipos de Datos" />
      </div>
    </section>
  );
};

export default LessonArea;