import Banner from "@/components/Banner";
import Marqueee from "@/components/Marqueee"
import TopGenerations from "@/components/FeaturedTiles";
import WhyChooseTiles from "@/components/WhyChooseTiles";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Marqueee></Marqueee>
      <Banner/>
      <div className="px-4 md:px-0">
        <TopGenerations/>
      </div>
      <WhyChooseTiles></WhyChooseTiles>
   
    </div>
  );
}
