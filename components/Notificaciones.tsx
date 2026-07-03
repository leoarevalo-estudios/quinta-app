"use client";

import { useEffect, useState, useRef } from "react";

interface Notificacion {
  id: number;
  mensaje: string;
  leida: boolean;
  createdAt: string;
}

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const cargar = async () => {
    const res = await fetch("/api/notificaciones");
    if (res.ok) {
      const data = await res.json();
      setNotificaciones(data);
    }
  };

  useEffect(() => {
    cargar();
    const intervalo = setInterval(cargar, 30000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  const handleAbrir = async () => {
    setAbierto(!abierto);
    if (!abierto && noLeidas > 0) {
      await fetch("/api/notificaciones", { method: "PATCH" });
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleAbrir}
        className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#e8e4dc] transition-colors"
      >
        <span style={{ fontSize: "18px" }}>&#x1F514;</span>
        {noLeidas > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {noLeidas > 9 ? "9+" : noLeidas}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 top-11 w-80 bg-white border border-[#e0dcd4] rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e0dcd4]">
            <p className="font-display text-[#1c3a2a] text-base">
              Notificaciones
            </p>
          </div>

          {notificaciones.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[#7a8070]">
              No tenés notificaciones
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              {notificaciones.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setAbierto(false);
                    if (n.mensaje.includes("Nueva reserva")) {
                      window.location.href = "/mi-quinta";
                    } else {
                      window.location.href = "/mis-reservas";
                    }
                  }}
                  className={`px-4 py-3 border-b border-[#f0ede6] last:border-0 cursor-pointer hover:bg-[#f0ede6] transition-colors ${!n.leida ? "bg-[#f7f5f0]" : ""
                    }`}
                >
                  <p className="text-sm text-[#1c3a2a] leading-snug">
                    {n.mensaje}
                  </p>
                  <p className="text-xs text-[#7a8070] mt-1">
                    {new Date(n.createdAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-[#4a7c59] mt-1">
                    {n.mensaje.includes("Nueva reserva") ? "Ver en Mi quinta →" : "Ver en Mis reservas →"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}