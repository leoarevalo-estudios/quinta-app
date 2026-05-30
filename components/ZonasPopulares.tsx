const ZONAS = [
  { nombre: "GBA Norte", quintas: 340, emoji: "🌳" },
  { nombre: "GBA Sur", quintas: 215, emoji: "🌿" },
  { nombre: "GBA Oeste", quintas: 189, emoji: "🌾" },
  { nombre: "Córdoba", quintas: 127, emoji: "⛰️" },
  { nombre: "Mendoza", quintas: 98, emoji: "🍇" },
  { nombre: "Entre Ríos", quintas: 76, emoji: "🌊" },
];

export default function ZonasPopulares() {
  return (
    <section className="bg-[#1c3a2a] py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-10">
          <p className="text-[#7db88a] text-sm tracking-wider uppercase mb-2">
            Destinos
          </p>
          <h2 className="font-display text-white text-4xl">Zonas populares</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ZONAS.map((z) => (
            <button
              key={z.nombre}
              className="bg-white/8 border border-white/15 rounded-2xl p-5 text-center hover:bg-white/15 transition-all hover:border-white/30 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {z.emoji}
              </div>
              <p className="font-display text-white text-base mb-1">{z.nombre}</p>
              <p className="text-white/50 text-xs">{z.quintas} quintas</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}