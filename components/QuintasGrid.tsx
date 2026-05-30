"use client";

import { useState } from "react";

const QUINTAS = [
  {
    id: 1,
    nombre: "Quinta Los Aromos",
    ubicacion: "Pilar, GBA Norte",
    precio: 85000,
    rating: 4.9,
    reviews: 38,
    capacidad: 120,
    amenities: ["Pileta", "Asador", "Estacionamiento"],
    badge: "Destacada",
    gradient: "from-emerald-800 via-green-700 to-teal-600",
    emoji: "🌳",
  },
  {
    id: 2,
    nombre: "Estancia El Paraíso",
    ubicacion: "Escobar, GBA Norte",
    precio: 120000,
    rating: 4.7,
    reviews: 12,
    capacidad: 200,
    amenities: ["Alojamiento", "Cancha", "SUM"],
    badge: "Nueva",
    gradient: "from-green-900 via-emerald-700 to-lime-600",
    emoji: "🌿",
  },
  {
    id: 3,
    nombre: "Quinta Don Julio",
    ubicacion: "Luján, PBA",
    precio: 65000,
    rating: 4.8,
    reviews: 61,
    capacidad: 80,
    amenities: ["Pileta", "Pet friendly", "Quincho"],
    badge: "Popular",
    gradient: "from-teal-800 via-cyan-700 to-emerald-600",
    emoji: "🌾",
  },
  {
    id: 4,
    nombre: "El Rancho Grande",
    ubicacion: "Cañuelas, PBA",
    precio: 95000,
    rating: 4.6,
    reviews: 29,
    capacidad: 150,
    amenities: ["Laguna", "Asador", "Fogón"],
    badge: null,
    gradient: "from-stone-700 via-amber-800 to-yellow-700",
    emoji: "🏡",
  },
  {
    id: 5,
    nombre: "Villa Serrana",
    ubicacion: "Córdoba Serrana",
    precio: 110000,
    rating: 5.0,
    reviews: 8,
    capacidad: 60,
    amenities: ["Vista panorámica", "Jacuzzi", "Fogón"],
    badge: "Premium",
    gradient: "from-slate-700 via-blue-800 to-indigo-700",
    emoji: "⛰️",
  },
  {
    id: 6,
    nombre: "La Castellana",
    ubicacion: "Exaltación de la Cruz",
    precio: 72000,
    rating: 4.8,
    reviews: 44,
    capacidad: 100,
    amenities: ["Pileta", "Cancha de tenis", "Asador"],
    badge: null,
    gradient: "from-rose-800 via-pink-700 to-fuchsia-700",
    emoji: "🌺",
  },
];

const FILTROS = [
  { label: "Todas", value: "todas" },
  { label: "Con pileta", value: "pileta" },
  { label: "Con alojamiento", value: "alojamiento" },
  { label: "Eventos grandes", value: "grandes" },
  { label: "Pet friendly", value: "pet" },
  { label: "Con cancha", value: "cancha" },
];

const BADGE_EMOJI: Record<string, string> = {
  Destacada: "⭐",
  Nueva: "🆕",
  Popular: "🔥",
  Premium: "✨",
};

export default function QuintasGrid() {
  const [filtroActivo, setFiltroActivo] = useState("todas");
  const [favoritos, setFavoritos] = useState<number[]>([1, 4]);

  const toggleFav = (id: number) =>
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      {/* Encabezado */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#4a7c59] text-sm tracking-wider uppercase mb-2">
            Explorar
          </p>
          <h2 className="font-display text-[#1c3a2a] text-4xl">
            Quintas destacadas
          </h2>
        </div>
        <a href="#" className="text-sm text-[#4a7c59] hover:underline hidden md:block">
          Ver todas →
        </a>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltroActivo(f.value)}
            className={`text-sm px-4 py-2 rounded-full border transition-all ${
              filtroActivo === f.value
                ? "bg-[#1c3a2a] text-white border-[#1c3a2a]"
                : "bg-white text-[#5a6650] border-[#d4d0c8] hover:border-[#4a7c59]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUINTAS.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e0dcd4] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            {/* Imagen */}
            <div
              className={`relative h-52 bg-gradient-to-br ${q.gradient} flex items-center justify-center`}
            >
              <span className="text-6xl opacity-60">{q.emoji}</span>

              {q.badge && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1c3a2a] text-xs font-medium px-3 py-1 rounded-full">
                  {BADGE_EMOJI[q.badge]} {q.badge}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(q.id);
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                {favoritos.includes(q.id) ? "❤️" : "🤍"}
              </button>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sm font-medium text-[#1c3a2a] px-3 py-1 rounded-full">
                ${q.precio.toLocaleString("es-AR")} / día
              </div>
            </div>

            {/* Cuerpo */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-display text-[#1c3a2a] text-lg leading-tight">
                  {q.nombre}
                </h3>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <span className="text-amber-400 text-sm">★</span>
                  <span className="text-sm text-[#5a6650]">
                    {q.rating}{" "}
                    <span className="text-[#9a9a8a]">({q.reviews})</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#7a8070] mb-3">
                📍 {q.ubicacion} · hasta {q.capacidad} personas
              </p>

              <div className="flex flex-wrap gap-1.5">
                {q.amenities.map((a) => (
                  <span
                    key={a}
                    className="text-xs bg-[#f0ede6] text-[#5a6650] px-2.5 py-1 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}