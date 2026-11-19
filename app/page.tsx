import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { StatusStrip } from "@/components/StatusStrip";
import { Activiteiten } from "@/components/sections/Activiteiten";
import { Baden } from "@/components/sections/Baden";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Nieuws } from "@/components/sections/Nieuws";
import { Regels } from "@/components/sections/Regels";
import { Tarieven } from "@/components/sections/Tarieven";
import { Tijden } from "@/components/sections/Tijden";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatusStrip />
        <Baden />
        <Tijden />
        <Tarieven />
        <Activiteiten />
        <Nieuws />
        <Regels />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
