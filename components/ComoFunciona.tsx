const PASOS = [
  {
    step: "01",
    icon: "🔍",
    titulo: "Buscás",
    desc: "Filtrás por zona, fecha, capacidad y lo que necesite tu evento.",
  },
  {
    step: "02",
    icon: "💬",
    titulo: "Consultás",
    desc: "Hablás directamente con el propietario y resolvés todas tus dudas.",
  },
  {
    step: "03",
    icon: "💳",
    titulo: "Reservás",
    desc: "Confirmás con pago seguro. La seña queda en garantía hasta el evento.",
  },
  {
    step: "04",
    icon: "🎉",
    titulo: "Disfrutás",
    desc: "El propietario te recibe. Después dejás tu reseña para la comunidad.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#4a7c59] text-sm tracking-wider uppercase mb-2">
            Simple y seguro
          </p>
          <h2 className="font-display text-[#1c3a2a] text-4xl">
            ¿Cómo funciona?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PASOS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f0ede6] rounded-2xl text-3xl mb-4">
                {s.icon}
              </div>
              <p className="text-[#c8c0b0] text-xs font-medium tracking-widest mb-2">
                {s.step}
              </p>
              <h3 className="font-display text-[#1c3a2a] text-xl mb-2">
                {s.titulo}
              </h3>
              <p className="text-[#7a8070] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}