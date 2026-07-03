"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AMENITIES_OPCIONES = [
  "Pileta", "Asador", "Quincho", "Estacionamiento", "Alojamiento",
  "Cancha de fútbol", "Cancha de tenis", "Pet friendly", "Fogón", "SUM",
  "Jacuzzi", "Vista panorámica",
];

const EMOJIS = ["&#x1F333;", "&#x1F33F;", "&#x1F33E;", "&#x1F3E1;", "&#x26F0;&#xFE0F;", "&#x1F33A;", "&#x1F343;", "&#x1F332;"];

export default function EditarQuintaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    precio: "",
    capacidad: "",
    emoji: "�",
  });
  const [amenitiesSeleccionados, setAmenitiesSeleccionados] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/quintas/" + id)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          ubicacion: data.ubicacion,
          precio: String(data.precio),
          capacidad: String(data.capacidad),
          emoji: data.emoji,
        });
        setAmenitiesSeleccionados(
          data.amenities ? data.amenities.split(", ").filter(Boolean) : []
        );
        setCargando(false);
      });
  }, [id]);

  const toggleAmenity = (a: string) =>
    setAmenitiesSeleccionados((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGuardar = async () => {
    setGuardando(true);
    setError("");

    const res = await fetch("/api/mis-quintas/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amenities: amenitiesSeleccionados.join(", "),
      }),
    });

    if (res.ok) {
      router.push("/mi-quinta");
    } else {
      const data = await res.json();
      setError(data.error);
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="text-[#7a8070]">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <div className="bg-[#1c3a2a] py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push("/mi-quinta")}
            className="text-[#7db88a] text-sm hover:underline bg-transparent border-none cursor-pointer mb-4 block"
          >
            &#8592; Volver
          </button>
          <h1 className="font-display text-white text-4xl">Editar quinta</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Datos básicos */}
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-[#1c3a2a] text-xl">Datos básicos</h2>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={4}
                style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#5a6650] mb-1 block">Ubicación</label>
              <input
                name="ubicacion"
                value={form.ubicacion}
                onChange={handleChange}
                style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">Precio por día ($)</label>
                <input
                  name="precio"
                  type="number"
                  value={form.precio}
                  onChange={handleChange}
                  style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">Capacidad</label>
                <input
                  name="capacidad"
                  type="number"
                  value={form.capacidad}
                  onChange={handleChange}
                  style={{ color: "#1c3a2a", backgroundColor: "#ffffff" }}
                  className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6">
            <h2 className="font-display text-[#1c3a2a] text-xl mb-4">¿Qué tiene tu quinta?</h2>
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

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className="flex-1 bg-[#1c3a2a] text-white py-4 rounded-xl font-medium hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              onClick={() => router.push("/mi-quinta")}
              className="px-6 bg-white border border-[#e0dcd4] text-[#5a6650] py-4 rounded-xl font-medium hover:bg-[#f0ede6] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}