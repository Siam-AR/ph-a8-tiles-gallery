import { Chip } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import tiles from "../../../../public/data.json";

const TilesDetailsPage = async ({params}) => {
    const {id} = await params;
    const tileItems = tiles;

    const tile = tileItems.find((item) => item.id == id)

    if (!tile) {
        notFound();
    }

    return (
                <div className="grid gap-8 lg:grid-cols-2 px-4 py-8">
                 <div className="relative aspect-square overflow-hidden rounded-3xl border">
                     <Image src={tile.image} alt={tile.title} fill unoptimized className="object-cover" />
                 </div>

                 <div className="space-y-4">
                     <Chip>{tile.category}</Chip>
                     <h1 className="text-3xl font-bold">{tile.title}</h1>
                     <p className="text-default-500 leading-relaxed">{tile.description}</p>
                     <p><span className="font-semibold">Material:</span> {tile.material}</p>
                     <p><span className="font-semibold">Dimensions:</span> {tile.dimensions}</p>
                     <p><span className="font-semibold">Price:</span> {tile.currency} {tile.price}</p>
                     <p><span className="font-semibold">Availability:</span> {tile.inStock ? "In stock" : "Out of stock"}</p>
                     <div className="flex flex-wrap gap-2 pt-2">
                         {tile.tags?.map((tag) => <Chip key={tag} variant="flat">{tag}</Chip>)}
                     </div>
                 </div>
        </div>
    );
};

export default TilesDetailsPage;