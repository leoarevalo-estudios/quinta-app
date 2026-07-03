"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos");
      setCargando(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-[#e0dcd4] p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-4xl">🌿</span>
          <h1 className="font-display text-2xl text-[#1c3a2a] mt-2">
            Bienvenido a quinta<span className="text-[#4a7c59] italic">.app</span>
          </h1>
          <p className="text-[#7a8070] text-sm mt-1">Ingresá a tu cuenta</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-[#5a6650] mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-[#5a6650] mb-1 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-[#e0dcd4] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="bg-[#1c3a2a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#2d5a3d] transition-colors disabled:opacity-50 mt-2"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Registro */}
        <div className="text-center mt-6 flex flex-col gap-2">
          <a href="/recuperar-password" className="text-sm text-[#7a8070] hover:text-[#4a7c59] transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
          <p className="text-sm text-[#7a8070]">
            ¿No tenés cuenta?{" "}
            <a href="/registro" className="text-[#4a7c59] hover:underline">
              Registrate gratis
            </a>
          </p>
        </div>
      </div>
    </div>
      );
}