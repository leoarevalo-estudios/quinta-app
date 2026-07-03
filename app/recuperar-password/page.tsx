"use client";

import { useState } from "react";

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const res = await fetch("/api/recuperar-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setCargando(false);
    } else {
      setLink(data.link ?? "");
      setEnviado(true);
    }
  };

  if (enviado) {
    return (
      <div style={{ minHeight: "100vh", background: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e0dcd4", padding: "32px", width: "100%", maxWidth: "448px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>&#x2709;</div>
          <p style={{ color: "#1c3a2a", fontWeight: 500, marginBottom: "8px" }}>Solicitud recibida</p>
          <p style={{ color: "#7a8070", fontSize: "14px", marginBottom: "24px" }}>
            En producción recibirías un email con el link. Para esta demo, podés usar el link directamente:
          </p>
          {link && (
            <div style={{ background: "#f0ede6", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px", textAlign: "left" }}>
              <p style={{ fontSize: "11px", color: "#7a8070", marginBottom: "8px" }}>Link de recuperación:</p>
              <a href={link} style={{ fontSize: "11px", color: "#4a7c59", wordBreak: "break-all" }}>
                {link}
              </a>
            </div>
          )}
          <a href="/login" style={{ fontSize: "14px", color: "#4a7c59" }}>
            Volver al login
          </a>
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
            Recuperar contraseña
          </h1>
          <p style={{ color: "#7a8070", fontSize: "14px", marginTop: "4px" }}>
            Ingresá tu email y te enviamos un link
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              style={{ width: "100%", border: "1px solid #e0dcd4", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", color: "#1c3a2a", backgroundColor: "#ffffff" }}
            />
          </div>
          <button
            type="submit"
            disabled={cargando}
            style={{ background: "#1c3a2a", color: "white", padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer", opacity: cargando ? 0.5 : 1 }}
          >
            {cargando ? "Procesando..." : "Recuperar contraseña"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#7a8070", marginTop: "24px" }}>
          <a href="/login" style={{ color: "#4a7c59" }}>
            Volver al login
          </a>
        </p>
      </div>
    </div>
  );
}