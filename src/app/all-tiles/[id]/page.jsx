import { Chip } from "@heroui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import tiles from "../../../../public/data.json";

const PhotoDetailsPage = async ({params}) => {
    const {id} = await params;
    const photos = tiles;

    const photo = photos.find(p => p.id == id)

    if (!photo) {
        notFound();
    }

   

    return (
                <div className="grid gap-8 lg:grid-cols-2 px-4 py-8">
                 <div className="relative aspect-square overflow-hidden rounded-3xl border">
                     <Image src={photo.image} alt={photo.title} fill unoptimized className="object-cover" />
                 </div>

                 <div className="space-y-4">
                     <Chip>{photo.category}</Chip>
                     <h1 className="text-3xl font-bold">{photo.title}</h1>
                     <p className="text-default-500 leading-relaxed">{photo.description}</p>
                     <p><span className="font-semibold">Material:</span> {photo.material}</p>
                     <p><span className="font-semibold">Dimensions:</span> {photo.dimensions}</p>
                     <p><span className="font-semibold">Price:</span> {photo.currency} {photo.price}</p>
                     <p><span className="font-semibold">Availability:</span> {photo.inStock ? "In stock" : "Out of stock"}</p>
                     <div className="flex flex-wrap gap-2 pt-2">
                         {photo.tags?.map(tag => <Chip key={tag} variant="flat">{tag}</Chip>)}
                     </div>
                 </div>
        </div>
    );
};

export default PhotoDetailsPage;