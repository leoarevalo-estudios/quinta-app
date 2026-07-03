"use client";

import { useState, useEffect } from "react";

interface Quinta {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precio: number;
  capacidad: number;
  amenities: string;
  emoji: string;
  propietario: { nombre: string };
}

export default function BuscarPage() {
  const [quintas, setQuintas] = useState<Quinta[]>([]);
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [cargando, setCargando] = useState(true);

  const buscar = async () => {
    setCargando(true);
    const params = new URLSearchParams();
    if (ubicacion) params.append("ubicacion", ubicacion);
    if (capacidad) params.append("capacidad", capacidad);

    const res = await fetch(`/api/quintas?${params.toString()}`);
    const data = await res.json();
    setQuintas(data);
    setCargando(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get("ubicacion") ?? "";
    const c = params.get("capacidad") ?? "";
    setUbicacion(u);
    setCapacidad(c);

    const searchParams = new URLSearchParams();
    if (u) searchParams.append("ubicacion", u);
    if (c) searchParams.append("capacidad", c);

    fetch(`/api/quintas?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setQuintas(data);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <div className="bg-[#1c3a2a] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="text-[#7db88a] text-sm hover:underline">
            ← Volver al inicio
          </a>
          <h1 className="font-display text-white text-4xl mt-4">
            Encontrá tu quinta
          </h1>

          {/* Buscador */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mt-6 max-w-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white/50">📍</span>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="¿Dónde? Pilar, Escobar..."
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 md:w-36">
                <span className="text-white/50">👥</span>
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  placeholder="Personas"
                  className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/45"
                />
              </div>
              <button
                onClick={buscar}
                className="bg-[#4a7c59] text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-[#3d6b4a] transition-colors"
              >
                🔍 Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {cargando ? (
          <div className="text-center py-20 text-[#7a8070]">
            Cargando quintas...
          </div>
        ) : quintas.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">�</span>
            <p className="text-[#7a8070] mt-4">
              No encontramos quintas con esos filtros
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#7a8070] mb-6">
              {quintas.length} quinta{quintas.length !== 1 ? "s" : ""} encontrada
              {quintas.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quintas.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e0dcd4] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  {/* Imagen */}
                  <div className="h-48 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 flex items-center justify-center">
                    <span className="text-6xl opacity-70">{q.emoji}</span>
                  </div>

                  {/* Cuerpo */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-display text-[#1c3a2a] text-lg">
                        {q.nombre}
                      </h3>
                      <span className="text-sm font-medium text-[#1c3a2a] bg-[#f0ede6] px-2 py-1 rounded-full shrink-0 ml-2">
                        ${q.precio.toLocaleString("es-AR")}
                      </span>
                    </div>

                    <p className="text-sm text-[#7a8070] mb-2">
                      📍 {q.ubicacion} · hasta {q.capacidad} personas
                    </p>

                    <p className="text-sm text-[#5a6650] mb-3 line-clamp-2">
                      {q.descripcion}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {q.amenities.split(", ").filter(Boolean).map((a) => (
                        <span
                          key={a}
                          className="text-xs bg-[#f0ede6] text-[#5a6650] px-2.5 py-1 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => window.location.href = "/quintas/" + q.id}
                      className="w-full bg-[#1c3a2a] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors"
                    >
                      Ver quinta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}