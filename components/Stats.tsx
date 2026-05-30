const STATS = [
  { num: "2.400+", label: "Quintas publicadas" },
  { num: "18.000+", label: "Reservas realizadas" },
  { num: "4.8 ⭐", label: "Satisfacción promedio" },
  { num: "0%", label: "Comisión al propietario" },
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl text-[#1c3a2a] mb-1">{s.num}</p>
            <p className="text-sm text-[#7a8070]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}