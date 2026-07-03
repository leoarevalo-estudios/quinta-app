"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MiCuentaPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const handleEditar = () => {
    setNombre(session?.user?.name ?? "");
    setEmail(session?.user?.email ?? "");
    setTelefono((session?.user as any)?.telefono ?? "");
    setEditando(true);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setError("");

    const res = await fetch("/api/perfil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setGuardando(false);
    } else {
      await update({
        name: nombre,
        email,
        telefono,
      });

      setEditando(false);
      setGuardando(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0]">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <div className="bg-[#1c3a2a] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.push("/")}
            className="text-[#7db88a] text-sm hover:underline mb-4 block bg-transparent border-none cursor-pointer"
          >
            &#8592; Volver al inicio
          </button>
          <h1 className="font-display text-4xl text-white">Mi cuenta</h1>
          <p className="text-white/60 mt-2">Administrá tu perfil y tu actividad.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Perfil */}
        <div className="bg-white rounded-2xl border border-[#e0dcd4] p-8 mb-8">
          {!editando ? (
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-[#1c3a2a] text-white flex items-center justify-center text-3xl font-bold">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-display text-3xl text-[#1c3a2a]">
                    {session?.user?.name}
                  </h2>
                  <p className="text-[#7a8070] mt-2">
                    &#x2709; {session?.user?.email}
                  </p>
                  <p className="text-[#7a8070]">
                    &#x1F4F1; {(session?.user as any)?.telefono || "Sin teléfono"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleEditar}
                  className="border border-[#d8d3c8] px-5 py-2 rounded-xl hover:bg-[#f7f5f0] text-sm"
                >
                  Editar perfil
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-[#1c3a2a] text-white px-5 py-2 rounded-xl hover:bg-[#2d5a3d] text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-md">
              <h2 className="font-display text-2xl text-[#1c3a2a] mb-2">
                Editar perfil
              </h2>

              {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
                />
              </div>

              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
                />
              </div>

              <div>
                <label className="text-sm text-[#5a6650] mb-1 block">Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: 1123456789"
                  style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleGuardar}
                  disabled={guardando}
                  style={{ background: "#1c3a2a", color: "white", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", border: "none", cursor: "pointer", opacity: guardando ? 0.5 : 1 }}
                >
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  onClick={() => setEditando(false)}
                  style={{ background: "white", color: "#5a6650", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", border: "1px solid #e0dcd4", cursor: "pointer" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#e0dcd4] p-8">
            <div className="text-5xl mb-4">&#x1F4C5;</div>
            <h2 className="font-display text-2xl text-[#1c3a2a]">Mis reservas</h2>
            <p className="text-[#7a8070] mt-2">Consultá todas las reservas que realizaste.</p>
            <button
              onClick={() => router.push("/mis-reservas")}
              className="mt-6 bg-[#1c3a2a] text-white px-5 py-3 rounded-xl text-sm"
            >
              Ver reservas
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-[#e0dcd4] p-8">
            <div className="text-5xl mb-4">&#x1F3E0;</div>
            <h2 className="font-display text-2xl text-[#1c3a2a]">Mis quintas</h2>
            <p className="text-[#7a8070] mt-2">Administrá tus quintas y las reservas recibidas.</p>
            <button
              onClick={() => router.push("/mi-quinta")}
              className="mt-6 bg-[#1c3a2a] text-white px-5 py-3 rounded-xl text-sm"
            >
              Ver mis quintas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}