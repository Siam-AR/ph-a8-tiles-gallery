import Banner from "@/components/Banner";
import FeaturedTiles from "@/components/FeaturedTiles";
import MarqueeComponent from "@/components/Marquee";
import WhyChooseTiles from "@/components/WhyChooseTiles";

export default function Home() {
  return (
    <div>
        <MarqueeComponent></MarqueeComponent>
        <Banner></Banner>
        <FeaturedTiles></FeaturedTiles>
        <WhyChooseTiles></WhyChooseTiles>
    </div>
  );
}
