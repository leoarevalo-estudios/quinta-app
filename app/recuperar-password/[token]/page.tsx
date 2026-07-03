"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);
    setError("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setCargando(false);
    } else {
      setExito(true);
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  if (exito) {
    return (
      <div style={{ minHeight: "100vh", background: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e0dcd4", padding: "32px", width: "100%", maxWidth: "448px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>&#x2705;</div>
          <h2 style={{ color: "#1c3a2a", fontSize: "22px", marginBottom: "8px" }}>
            Contraseña actualizada
          </h2>
          <p style={{ color: "#7a8070", fontSize: "14px" }}>
            Te redirigimos al login en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e0dcd4", padding: "32px", width: "100%", maxWidth: "448px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span style={{ fontSize: "40px" }}>&#x1F511;</span>
          <h1 style={{ fontSize: "24px", color: "#1c3a2a", marginTop: "8px" }}>
            Nueva contraseña
          </h1>
          <p style={{ color: "#7a8070", fontSize: "14px", marginTop: "4px" }}>
            Elegí una contraseña segura
          </p>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px", marginBottom: "24px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "14px", color: "#5a6650", marginBottom: "4px", display: "block" }}>
              Nueva contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "14px", color: "#5a6650", marginBottom: "4px", display: "block" }}>
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="Repetí la contraseña"
              required
              style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
            />
          </div>
          <button
            type="submit"
            disabled={cargando}
            style={{ background: "#1c3a2a", color: "white", padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer", opacity: cargando ? 0.5 : 1, marginTop: "8px" }}
          >
            {cargando ? "Guardando..." : "Guardar nueva contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}