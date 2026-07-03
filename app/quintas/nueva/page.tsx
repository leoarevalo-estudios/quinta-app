"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AMENITIES_OPCIONES = [
  "Pileta",
  "Asador",
  "Quincho",
  "Estacionamiento",
  "Alojamiento",
  "Cancha de fútbol",
  "Cancha de tenis",
  "Pet friendly",
  "Fogón",
  "SUM",
  "Jacuzzi",
  "Vista panorámica",
];

const EMOJIS = ["🏕️", "🏖️", "🏝️", "🏜️", "⛰️", "🏞️", "🏟️", "🏛️"];

export default function NuevaQuintaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    precio: "",
    capacidad: "",
    emoji: "🏕️",
  });
  const [amenitiesSeleccionados, setAmenitiesSeleccionados] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const toggleAmenity = (a: string) =>
    setAmenitiesSeleccionados((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const res = await fetch("/api/quintas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amenities: amenitiesSeleccionados.join(", "),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setCargando(false);
    } else {
      router.push("/buscar");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <div className="bg-[#1c3a2a] py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <a href="/" className="text-[#7db88a] text-sm hover:underline">
            ← Volver al inicio
          </a>
          <h1 className="font-display text-white text-4xl mt-4">
            Publicá tu quinta
          </h1>
          <p className="text-white/60 text-sm mt-2">
            Completá los datos y empezá a recibir reservas
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Emoji */}
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6">
            <label className="text-sm font-medium text-[#1c3a2a] mb-3 block">
              Elegí un ícono para tu quinta
            </label>
            <div className="flex gap-3 flex-wrap">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setForm({ ...form, emoji: e })}
                  className={`text-2xl w-12 h-12 rounded-xl border-2 transition-all ${
                    form.emoji === e
                      ? "border-[#1c3a2a] bg-[#f0ede6]"
                      : "border-transparent hover:border-[#e0dcd4]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Datos básicos */}
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-[#1c3a2a] text-xl">
              Datos básicos
            </h2>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">
                Nombre de la quinta
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Quinta Los Aromos"
                required
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Describí tu quinta, el ambiente, qué la hace especial..."
                required
                rows={4}
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">
                Ubicación
              </label>
              <input
                name="ubicacion"
                value={form.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Pilar, GBA Norte"
                required
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">
                  Precio por día ($)
                </label>
                <input
                  name="precio"
                  type="number"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="85000"
                  required
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">
                  Capacidad (personas)
                </label>
                <input
                  name="capacidad"
                  type="number"
                  value={form.capacidad}
                  onChange={handleChange}
                  placeholder="100"
                  required
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6">
            <h2 className="font-display text-[#1c3a2a] text-xl mb-4">
              ¿Qué tiene tu quinta?
            </h2>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_OPCIONES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`text-sm px-4 py-2 rounded-full border transition-all ${
                    amenitiesSeleccionados.includes(a)
                      ? "bg-[#1c3a2a] text-white border-[#1c3a2a]"
                      : "border-[#e0dcd4] text-[#5a6650] hover:border-[#4a7c59]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={cargando}
            className="bg-[#1c3a2a] text-white py-4 rounded-xl font-medium hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
          >
            {cargando ? "Publicando..." : "Publicar quinta"}
          </button>
        </form>
      </div>
    </div>
  );
}