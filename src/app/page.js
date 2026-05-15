import Banner from "@/components/Banner";
import MarqueeComponent from "@/components/Marquee";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <MarqueeComponent></MarqueeComponent>
        <Banner></Banner>
    </div>
  );
}
