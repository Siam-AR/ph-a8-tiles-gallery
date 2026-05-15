import tiles from "../../public/data.json";
import TilesCard from "./TilesCard";

const FeaturedTiles = async () => {
    const topPhotos = tiles.slice(0, 4)

    return (
        <div>
            <h1 className="text-2xl font-bold my-5">Featured Tiles</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {topPhotos.map(photo => <TilesCard key={photo.id} photo={photo} />)}
            </div>
        </div>
    );
};

export default FeaturedTiles;