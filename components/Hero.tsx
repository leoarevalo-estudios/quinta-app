"use client";

import { useState } from "react";

export default function Hero() {
  const [busqueda, setBusqueda] = useState("");
  const [personas, setPersonas] = useState("");

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#1c3a2a]">
      {/* Fondos */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2218] via-[#1c3a2a] to-[#2d5a3d]" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#3d7a52]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-[#4a7c59]/20 to-transparent" />
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-[#4a7c59]/10 blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-[#2d5a3d]/20 blur-3xl" />
      </div>

      {/* Tarjetas flotantes */}
      <div className="absolute right-[5%] top-0 bottom-0 w-[38%] z-20 hidden lg:flex flex-col justify-center gap-4 items-end pointer-events-none">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          .fc {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 0.5px solid rgba(255,255,255,0.18);
            border-radius: 16px;
            padding: 14px 16px;
            color: white;
          }
          .fc-label { font-size: 10px; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
          .fc-title { font-family: 'Playfair Display', serif; font-size: 14px; margin-bottom: 4px; color: white; }
          .fc-sub { font-size: 11px; color: rgba(255,255,255,0.6); }
        `}</style>

        <div className="fc" style={{ width: "200px", animation: "float 4s ease-in-out infinite", animationDelay: "0s" }}>
          <div className="fc-label">Próxima reserva</div>
          <div className="fc-title">Quinta Los Aromos</div>
          <div className="fc-sub">Sáb 14 jun · 80 personas</div>
        </div>

        <div className="fc" style={{ width: "168px", marginRight: "24px", animation: "float 4s ease-in-out infinite", animationDelay: "1.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>⭐</span>
            <div>
              <div style={{ fontWeight: 500, fontSize: "15px", color: "white" }}>4.9 / 5</div>
              <div className="fc-sub">38 reseñas</div>
            </div>
          </div>
        </div>

        <div className="fc" style={{ width: "184px", animation: "float 4s ease-in-out infinite", animationDelay: "2s" }}>
          <div className="fc-label">Confirmada ✓</div>
          <div className="fc-title">Villa Serrana</div>
          <div className="fc-sub">$110.000 · 60 personas</div>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          <p className="text-[#7db88a] text-sm tracking-widest uppercase mb-6 fade-up">
            La plataforma de quintas de Argentina
          </p>
          <h1 className="font-display text-white text-5xl md:text-6xl leading-tight mb-6 fade-up delay-1">
            Tu próximo evento,<br />
            <em className="text-[#7db88a]">en la quinta perfecta</em>
          </h1>
          <p className="text-white/65 text-lg mb-10 leading-relaxed fade-up delay-2">
            Más de 2.400 quintas en todo el país. Publicá la tuya o encontrá el
            espacio ideal para tu cumpleaños, casamiento o reunión familiar.
          </p>

          {/* Buscador */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 fade-up delay-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white/50 text-lg">📍</span>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="¿Dónde? Pilar, Escobar, Luján..."
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 md:w-36">
                <span className="text-white/50 text-lg">👥</span>
                <input
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  placeholder="Personas"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <button className="bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <span>🔍</span> Buscar quintas
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5 fade-up delay-4">
            <span className="text-white/40 text-xs self-center">Popular:</span>
            {["Pileta + asador", "Eventos 100+ personas", "GBA Norte", "Con alojamiento"].map((t) => (
              <button
                key={t}
                className="text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ola */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 52Z" fill="#f7f5f0" />
        </svg>
      </div>
    </section>
  );
}