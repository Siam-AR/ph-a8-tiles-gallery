import tiles from "../../public/data.json";
import TilesCard from "./TilesCard";

const FeaturedTiles = async () => {
    const topTiles = tiles.slice(0, 4)

    return (
        <div className="px-4 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold my-4 md:my-5">Featured Tiles</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {topTiles.map((tile) => <TilesCard key={tile.id} tile={tile} />)}
            </div>
        </div>
    );
};

export default FeaturedTiles;