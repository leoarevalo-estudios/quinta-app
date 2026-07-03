"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol] = useState("usuario");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, telefono, rol }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setCargando(false);
    } else {
      router.push("/login");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #e0dcd4",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    color: "#1c3a2a",
    backgroundColor: "#ffffff",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ backgroundColor: "white", borderRadius: "24px", border: "1px solid #e0dcd4", padding: "32px", width: "100%", maxWidth: "448px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span style={{ fontSize: "40px" }}>🌿</span>
          <h1 style={{ fontSize: "24px", color: "#1c3a2a", marginTop: "8px" }}>
            Creá tu cuenta
          </h1>
          <p style={{ color: "#7a8070", fontSize: "14px", marginTop: "4px" }}>
            Es gratis y tarda menos de un minuto
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px", marginBottom: "24px" }}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "14px", color: "#5a6650", marginBottom: "4px", display: "block" }}>
              Nombre completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Juan Pérez"
              required
              style={inputStyle}
            />
          </div>

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
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "14px",
                color: "#5a6650",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Teléfono
            </label>

            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="11 1234-5678"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: "14px", color: "#5a6650", marginBottom: "4px", display: "block" }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            style={{
              backgroundColor: "#1c3a2a",
              color: "white",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              marginTop: "8px",
              opacity: cargando ? 0.5 : 1,
            }}
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta gratis"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#7a8070", marginTop: "24px" }}>
          ¿Ya tenés cuenta?{" "}
          <a href="/login" style={{ color: "#4a7c59" }}>
            Ingresá acá
          </a>
        </p>
      </div>
    </div>
  );
}