"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Reserva {
  id: number;
  fecha: string;
  personas: number;
  estado: string;
  quinta: {
    id: number;
    nombre: string;
    ubicacion: string;
    precio: number;
    emoji: string;
  };
}

const ESTADO_ESTILO: Record<string, { bg: string; text: string; label: string }> = {
  pendiente: { bg: "#fef9c3", text: "#854d0e", label: "Pendiente" },
  confirmada: { bg: "#dcfce7", text: "#166534", label: "Confirmada" },
  cancelada: { bg: "#fee2e2", text: "#991b1b", label: "Cancelada" },
};

export default function MisReservasPage() {
  const router = useRouter();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/reservas")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setReservas(data);
          setCargando(false);
        }
      })
      .catch(() => {
        setError("Error al cargar las reservas");
        setCargando(false);
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <div className="bg-[#1c3a2a] py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push("/mi-cuenta")}
            className="text-[#7db88a] text-sm hover:underline bg-transparent border-none cursor-pointer mb-4 block"
          >
            &#8592; Volver 
          </button>
          <h1 className="font-display text-white text-4xl">Mis reservas</h1>
          <p className="text-white/60 text-sm mt-2">
            Todas tus solicitudes de reserva
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {cargando ? (
          <div className="text-center py-20 text-[#7a8070]">
            Cargando reservas...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : reservas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">&#x1F4C5;</div>
            <p className="text-[#7a8070] mb-4">No tenés reservas todavía</p>
            <button
              onClick={() => router.push("/buscar")}
              className="bg-[#1c3a2a] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors"
            >
              Buscar quintas
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reservas.map((r) => {
              const estado = ESTADO_ESTILO[r.estado] ?? ESTADO_ESTILO.pendiente;
              return (
                <div
                  key={r.id}
                  className="bg-white border border-[#e0dcd4] rounded-2xl p-6 flex gap-4 items-start"
                >
                  {/* Emoji quinta */}
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {r.quinta.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-display text-[#1c3a2a] text-xl">
                          {r.quinta.nombre}
                        </h3>
                        <p className="text-[#7a8070] text-sm mt-0.5">
                          &#x1F4CD; {r.quinta.ubicacion}
                        </p>
                      </div>
                      <span
                        style={{
                          backgroundColor: estado.bg,
                          color: estado.text,
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "4px 12px",
                          borderRadius: "99px",
                        }}
                      >
                        {estado.label}
                      </span>
                    </div>

                    <div className="flex gap-6 mt-4 flex-wrap">
                      <div>
                        <p className="text-xs text-[#7a8070]">Fecha</p>
                        <p className="text-sm text-[#1c3a2a] font-medium mt-0.5">
                          {new Date(r.fecha).toLocaleDateString("es-AR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#7a8070]">Personas</p>
                        <p className="text-sm text-[#1c3a2a] font-medium mt-0.5">
                          {r.personas} personas
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#7a8070]">Precio por día</p>
                        <p className="text-sm text-[#1c3a2a] font-medium mt-0.5">
                          ${r.quinta.precio.toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ver quinta */}
                  <button
                    onClick={() => window.location.href = "/quintas/" + r.quinta.id}
                    className="text-sm text-[#4a7c59] hover:underline shrink-0 bg-transparent border-none cursor-pointer"
                  >
                    Ver quinta
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}