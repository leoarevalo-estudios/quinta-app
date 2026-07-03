"use client";

import { useState, useEffect } from "react";

interface Quinta {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  capacidad: number;
  amenities: string;
  emoji: string;
}

interface QuintasGridProps {
  ubicacion?: string;
  capacidad?: string;
}

const FILTROS = [
  { label: "Todas", value: "todas" },
  { label: "Con pileta", value: "pileta" },
  { label: "Con alojamiento", value: "alojamiento" },
  { label: "Eventos grandes", value: "grandes" },
  { label: "Pet friendly", value: "pet" },
  { label: "Con cancha", value: "cancha" },
];

const FILTRO_MAP: Record<string, string> = {
  pileta: "Pileta",
  alojamiento: "Alojamiento",
  pet: "Pet friendly",
  cancha: "Cancha",
};

export default function QuintasGrid({ ubicacion = "", capacidad = "" }: QuintasGridProps) {
  const [filtroActivo, setFiltroActivo] = useState("todas");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [quintas, setQuintas] = useState<Quinta[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    const params = new URLSearchParams();
    if (ubicacion) params.append("ubicacion", ubicacion);
    if (capacidad) params.append("capacidad", capacidad);

    fetch(`/api/quintas?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setQuintas(data);
        setCargando(false);
      });
  }, [ubicacion, capacidad]);

  const toggleFav = (id: number) =>
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const quintasFiltradas = quintas.filter((q) => {
    if (filtroActivo === "todas") return true;
    if (filtroActivo === "grandes") return q.capacidad >= 100;
    return q.amenities
      .toLowerCase()
      .includes(FILTRO_MAP[filtroActivo]?.toLowerCase() ?? "");
  });

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#4a7c59] text-sm tracking-wider uppercase mb-2">
            Explorar
          </p>
          <h2 className="font-display text-[#1c3a2a] text-4xl">
            Quintas destacadas
          </h2>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltroActivo(f.value)}
            className={`text-sm px-4 py-2 rounded-full border transition-all ${filtroActivo === f.value
                ? "bg-[#1c3a2a] text-white border-[#1c3a2a]"
                : "bg-white text-[#5a6650] border-[#d4d0c8] hover:border-[#4a7c59]"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {cargando ? (
        <div className="text-center py-20 text[#7a8070]">
          Cargando quintas...
        </div>
      ) : quintasFiltradas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#7a8070] mt-4">No hay quintas disponibles</p>
          <a href="/quintas/nueva" className="text-[#4a7c59] text-sm hover:underline mt-2 block">
            ¿Tenés una quinta? Publicala acá →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quintasFiltradas.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e0dcd4] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
              onClick={() => window.location.href = "/quintas/" + q.id}
            >
              <div className="relative h-52 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 flex items-center justify-center">
                <span className="text-6xl opacity-60">{q.emoji}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(q.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {favoritos.includes(q.id) ? "❤️" : "🩶"}
                </button>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sm font-medium text-[#1c3a2a] px-3 py-1 rounded-full">
                  ${q.precio.toLocaleString("es-AR")} / día
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display text-[#1c3a2a] text-lg leading-tight mb-1">
                  {q.nombre}
                </h3>
                <p className="text-sm text-[#7a8070] mb-3">
                  📍{q.ubicacion} · hasta {q.capacidad} personas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {q.amenities.split(", ").filter(Boolean).map((a) => (
                    <span key={a} className="text-xs bg-[#f0ede6] text-[#5a6650] px-2.5 py-1 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}