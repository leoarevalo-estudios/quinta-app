import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import QuintasGrid from "@/components/QuintasGrid";
import CtaPropietarios from "@/components/CtaPropietarios";
import ComoFunciona from "@/components/ComoFunciona";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <Navbar />
      <Hero />
      <Stats />
      <QuintasGrid />
      <CtaPropietarios />
      <ComoFunciona />
      <Footer />
    </main>
  );
}