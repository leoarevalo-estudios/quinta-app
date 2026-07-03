"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Notificaciones from "./Notificaciones";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-[#f7f5f0]/90 backdrop-blur-sm border-b border-[#e0dcd4]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-display text-xl text-[#1c3a2a] tracking-tight">
            quinta<span className="text-[#4a7c59] italic">.app</span>
          </span>
        </Link>
        
        {/* Botones */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
             <Notificaciones />
              <button
                onClick={() => window.location.href = "/mi-cuenta"}
                className="text-sm text-[#5a6650] hidden md:block hover:text-[#1c3a2a] transition-colors bg-transparent border-none cursor-pointer"
              >
                Hola, {session.user?.name?.split(" ")[0]} &#x1F44B;
              </button>
              <Link
                href="/quintas/nueva"
                className="text-sm text-[#1c3a2a] px-4 py-2 rounded-full hover:bg-[#e8e4dc] transition-colors"
              >
                Publicar quinta
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm bg-[#1c3a2a] text-white px-4 py-2 rounded-full hover:bg-[#2d5a3d] transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/mi-quinta"
                className="text-sm text-[#1c3a2a] px-4 py-2 rounded-full hover:bg-[#e8e4dc] transition-colors"
              >
                Mi quinta
              </Link>
              <Link
                href="/quintas/nueva"
                className="text-sm text-[#1c3a2a] px-4 py-2 rounded-full hover:bg-[#e8e4dc] transition-colors"
              >
                Publicar quinta
              </Link>
              <Link
                href="/login"
                className="text-sm bg-[#1c3a2a] text-white px-4 py-2 rounded-full hover:bg-[#2d5a3d] transition-colors"
              >
                Ingresar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}