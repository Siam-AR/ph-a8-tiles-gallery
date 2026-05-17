import Banner from "@/components/Banner";
import Marqueee from "@/components/Marqueee"
import TopGenerations from "@/components/FeaturedTiles";
import WhyChooseTiles from "@/components/WhyChooseTiles";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <div>
      <Marqueee></Marqueee>
      <Banner/>
      <TopGenerations/>
      <WhyChooseTiles></WhyChooseTiles>
   
    </div>
  );
}
