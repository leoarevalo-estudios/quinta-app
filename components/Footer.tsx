export default function Footer() {
  return (
    <footer className="bg-[#0f2218] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-display text-white text-lg tracking-tight">
              quinta<span className="text-[#7db88a] italic">.app</span>
            </span>
          </div>

          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Términos</a>
            <a href="#" className="hover:text-white/70 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/70 transition-colors">Ayuda</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contacto</a>
          </div>

          <p className="text-white/30 text-xs">© 2025 quinta.app · Argentina</p>

        </div>
      </div>
    </footer>
  );
}