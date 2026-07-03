"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Quinta {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precio: number;
  capacidad: number;
  amenities: string;
  emoji: string;
  propietario: { nombre: string; email: string };
}

export default function DetalleQuintaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quinta, setQuinta] = useState<Quinta | null>(null);
  const [cargando, setCargando] = useState(true);
  const [fecha, setFecha] = useState("");
  const [personas, setPersonas] = useState("");
  const [reservando, setReservando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/quintas/" + id)
      .then((res) => res.json())
      .then((data) => {
        setQuinta(data);
        setCargando(false);
      });
  }, [id]);

  const handleReservar = async () => {
    setReservando(true);
    setError("");

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quintaId: id, fecha, personas }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setReservando(false);
    } else {
      setExito(true);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="text-[#7a8070]">Cargando...</p>
      </div>
    );
  }

  if (!quinta) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="text-[#7a8070]">Quinta no encontrada</p>
      </div>
    );
  }

  if (exito) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-[#e0dcd4] p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">&#x1F389;</div>
          <h2 className="font-display text-[#1c3a2a] text-2xl mb-2">
            Reserva enviada
          </h2>
          <p className="text-[#7a8070] text-sm mb-6">
            Tu solicitud para <strong>{quinta.nombre}</strong> fue enviada. El propietario la confirmará a la brevedad.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#1c3a2a] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 h-64 flex items-center justify-center relative">
        <span className="text-8xl opacity-60">{quinta.emoji}</span>
        <button
          onClick={() => router.push("/buscar")}
          className="absolute top-6 left-6 text-white/70 text-sm hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          &#8592; Volver
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="font-display text-[#1c3a2a] text-4xl mb-2">
            {quinta.nombre}
          </h1>
          <p className="text-[#7a8070] text-sm mb-6">
            &#x1F4CD; {quinta.ubicacion} · hasta {quinta.capacidad} personas
          </p>
          <p className="text-[#4a5a46] leading-relaxed mb-8">
            {quinta.descripcion}
          </p>
          <h3 className="font-display text-[#1c3a2a] text-xl mb-4">
            ¿Qué incluye?
          </h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {(quinta.amenities || "").split(", ").filter(Boolean).map((a) => (
              <span
                key={a}
                className="text-sm bg-[#f0ede6] text-[#5a6650] px-3 py-1.5 rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
          <div className="bg-[#f0ede6] rounded-2xl p-4">
            <p className="text-sm text-[#5a6650]">
              Publicada por <strong>{quinta.propietario?.nombre ?? "Propietario"}</strong>
            </p>
          </div>
        </div>

        {/* Formulario reserva */}
        <div className="md:col-span-1">
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6 sticky top-6">
            <p className="font-display text-[#1c3a2a] text-2xl mb-1">
              ${quinta.precio.toLocaleString("es-AR")}
            </p>
            <p className="text-[#7a8070] text-xs mb-6">por día</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-[#5a6650] mb-1 block">
                  Fecha del evento
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a6650] mb-1 block">
                  Cantidad de personas
                </label>
                <input
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  placeholder={"Max. " + quinta.capacidad}
                  max={quinta.capacidad}
                  style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
              <button
                onClick={handleReservar}
                disabled={!fecha || !personas || reservando}
                className="bg-[#1c3a2a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
              >
                {reservando ? "Enviando reserva..." : "Reservar ahora"}
              </button>
              <p className="text-xs text-[#7a8070] text-center">
                No se te cobrará nada hasta que el propietario confirme
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}