"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Reserva {
    id: number;
    fecha: string;
    personas: number;
    estado: string;
    usuario: {
        nombre: string;
        email: string;
        telefono: string;
    };
}

interface Quinta {
    id: number;
    nombre: string;
    ubicacion: string;
    precio: number;
    capacidad: number;
    amenities: string;
    emoji: string;
    reservas: Reserva[];
}

const ESTADO_ESTILO: Record<string, { bg: string; text: string; label: string }> = {
    pendiente: { bg: "#fef9c3", text: "#854d0e", label: "Pendiente" },
    confirmada: { bg: "#dcfce7", text: "#166534", label: "Confirmada" },
    cancelada: { bg: "#fee2e2", text: "#991b1b", label: "Cancelada" },
};

export default function MiQuintaPage() {
    const router = useRouter();
    const [quintas, setQuintas] = useState<Quinta[]>([]);
    const [cargando, setCargando] = useState(true);
    const [actualizando, setActualizando] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/mis-quintas")
            .then((res) => {
                if (res.status === 401) {
                    router.push("/login");
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setQuintas(data);
                    setCargando(false);
                }
            });
    }, [router]);

    const cambiarEstado = async (reservaId: number, estado: string) => {
        setActualizando(reservaId);
        await fetch("/api/reservas/" + reservaId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado }),
        });

        setQuintas((prev) =>
            prev.map((q) => ({
                ...q,
                reservas: q.reservas.map((r) =>
                    r.id === reservaId ? { ...r, estado } : r
                ),
            }))
        );
        setActualizando(null);
    };
    const handleEliminar = async (quintaId: number) => {
        if (!confirm("¿Seguro que querés eliminar esta quinta? También se eliminarán todas sus reservas.")) return;

        await fetch("/api/mis-quintas/" + quintaId, { method: "DELETE" });
        setQuintas((prev) => prev.filter((q) => q.id !== quintaId));
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0]">
            {/* Header */}
            <div className="bg-[#1c3a2a] py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => router.push("/mi-cuenta")}
                        className="text-[#7db88a] text-sm hover:underline bg-transparent border-none cursor-pointer mb-4 block"
                    >
                        &#8592; Volver
                    </button>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="font-display text-white text-4xl">Mi quinta</h1>
                            <p className="text-white/60 text-sm mt-2">
                                Gestioná tus quintas y reservas
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/quintas/nueva")}
                            className="bg-[#4a7c59] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#3d6b4a] transition-colors"
                        >
                            + Publicar nueva quinta
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {cargando ? (
                    <div className="text-center py-20 text-[#7a8070]">
                        Cargando...
                    </div>
                ) : quintas.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">&#x1F3E1;</div>
                        <p className="text-[#7a8070] mb-4">
                            Todavía no publicaste ninguna quinta
                        </p>
                        <button
                            onClick={() => router.push("/quintas/nueva")}
                            className="bg-[#1c3a2a] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors"
                        >
                            Publicar mi primera quinta
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {quintas.map((q) => (
                            <div key={q.id}>
                                {/* Info quinta */}
                                <div className="bg-white border border-[#e0dcd4] rounded-2xl p-6 mb-4 flex gap-4 items-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                        {q.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="font-display text-[#1c3a2a] text-2xl">
                                            {q.nombre}
                                        </h2>
                                        <p className="text-[#7a8070] text-sm">
                                            &#x1F4CD; {q.ubicacion} · hasta {q.capacidad} personas · ${q.precio.toLocaleString("es-AR")} / día
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="text-right">
                                            <p className="text-2xl font-display text-[#1c3a2a]">{q.reservas.length}</p>
                                            <p className="text-xs text-[#7a8070]">reservas</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => window.location.href = "/quintas/" + q.id + "/editar"}
                                                className="text-xs bg-white text-yellow-500 border border-yellow-400 px-3 py-1.5 rounded-lg hover:bg-yellow-50 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(q.id)}
                                                className="text-xs bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Reservas */}
                                {q.reservas.length === 0 ? (
                                    <div className="bg-[#f0ede6] rounded-xl px-6 py-4 text-sm text-[#7a8070]">
                                        Todavía no hay reservas para esta quinta
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {q.reservas.map((r) => {
                                            const estado = ESTADO_ESTILO[r.estado] ?? ESTADO_ESTILO.pendiente;
                                            return (
                                                <div
                                                    key={r.id}
                                                    className="bg-white border border-[#e0dcd4] rounded-xl px-6 py-4 flex items-center gap-4 flex-wrap"
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-[#1c3a2a]">
                                                            {r.usuario.nombre}
                                                        </p>
                                                        <p className="text-xs text-[#7a8070]">
                                                            📮 {r.usuario.email}
                                                        </p>
                                                        <p className="text-xs text-[#7a8070]">
                                                            📱 {r.usuario.telefono}
                                                        </p>
                                                    </div>

                                                    <div className="text-sm text-[#5a6650]">
                                                        {new Date(r.fecha).toLocaleDateString("es-AR", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </div>

                                                    <div className="text-sm text-[#5a6650]">
                                                        {r.personas} personas
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

                                                    {r.estado === "pendiente" && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => cambiarEstado(r.id, "confirmada")}
                                                                disabled={actualizando === r.id}
                                                                className="bg-[#1c3a2a] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#2d5a3d] transition-colors disabled:opacity-50"
                                                            >
                                                                Confirmar
                                                            </button>
                                                            <button
                                                                onClick={() => cambiarEstado(r.id, "cancelada")}
                                                                disabled={actualizando === r.id}
                                                                className="bg-white text-red-600 border border-red-200 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}