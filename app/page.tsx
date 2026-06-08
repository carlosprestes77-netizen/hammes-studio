import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Hero from "@/components/sections/Hero";
import AgendaBanner from "@/components/sections/AgendaBanner";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import Manifesto from "@/components/sections/Manifesto";
import FlashGallery from "@/components/sections/FlashGallery";
import SimuladorKonva from "@/components/sections/SimuladorKonva";
import Process from "@/components/sections/Process";
import Studio from "@/components/sections/Studio";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <AgendaBanner />
        <Stats />
        <Portfolio />
        <Manifesto />
        <FlashGallery />
        <SimuladorKonva />
        <Process />
        <Studio />
        <Testimonials />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
