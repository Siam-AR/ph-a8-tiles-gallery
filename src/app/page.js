import Banner from "@/components/Banner";
import FeaturedTiles from "@/components/FeaturedTiles";
import MarqueeComponent from "@/components/Marquee";

export default function Home() {
  return (
    <div>
        <MarqueeComponent></MarqueeComponent>
        <Banner></Banner>
        <FeaturedTiles></FeaturedTiles>
    </div>
  );
}
