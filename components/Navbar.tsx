export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#f7f5f0]/90 backdrop-blur-sm border-b border-[#e0dcd4]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-display text-xl text-[#1c3a2a] tracking-tight">
            quinta<span className="text-[#4a7c59] italic">.app</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#5a6650]">
          <a href="#" className="hover:text-[#1c3a2a] transition-colors">Explorar</a>
          <a href="#" className="hover:text-[#1c3a2a] transition-colors">Zonas</a>
          <a href="#" className="hover:text-[#1c3a2a] transition-colors">¿Cómo funciona?</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-[#1c3a2a] px-4 py-2 rounded-full hover:bg-[#e8e4dc] transition-colors">
            Publicar quinta
          </button>
          <button className="text-sm bg-[#1c3a2a] text-white px-4 py-2 rounded-full hover:bg-[#2d5a3d] transition-colors">
            Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
}