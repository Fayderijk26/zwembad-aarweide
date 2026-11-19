import { Hero } from "@/components/Hero";
import { StatusStrip } from "@/components/StatusStrip";
import { Baden } from "@/components/sections/Baden";
import { DirectNaar } from "@/components/sections/DirectNaar";
import { Nieuws } from "@/components/sections/Nieuws";
import { VrijwilligersOproep } from "@/components/sections/Vrijwilligers";

export default function Home() {
  return (
    <>
      <Hero />
      <StatusStrip />
      <Baden />
      <DirectNaar />
      <Nieuws />
      <VrijwilligersOproep />
    </>
  );
}
