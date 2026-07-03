"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");

  const handleBuscar = () => {
    const params = new URLSearchParams();
    if (ubicacion) params.append("ubicacion", ubicacion);
    if (capacidad) params.append("capacidad", capacidad);
    router.push(`/buscar?${params.toString()}`);
  };

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
            <span style={{ fontSize: "24px" }}>&#x2B50;</span>
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
          <p className="text-[#7db88a] text-sm tracking-widest uppercase mb-6">
            La plataforma de quintas de Argentina
          </p>
          <h1 className="font-display text-white text-5xl md:text-6xl leading-tight mb-6">
            Tu próximo evento,<br />
            <em className="text-[#7db88a]">en la quinta perfecta</em>
          </h1>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Más de 2.400 quintas en todo el país. Publicá la tuya o encontrá el
            espacio ideal para tu cumpleaños, casamiento o reunión familiar.
          </p>

          {/* Buscador */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span style={{ fontSize: "16px" }}>&#x1F4CD;</span>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                  placeholder="¿Dónde? Pilar, Escobar, Luján..."
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 md:w-40">
                <span style={{ fontSize: "16px" }}>&#x1F465;</span>
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                  placeholder="Personas"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <button
                onClick={handleBuscar}
                className="bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center"
              >
                <span style={{ fontSize: "14px" }}>&#x1F50D;</span>
                Buscar quintas
              </button>
            </div>
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