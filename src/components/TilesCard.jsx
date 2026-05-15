import { Button, Card, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const TilesCard = ({photo}) => {
    return (
        <Card className="border rounded-xl overflow-hidden">
            <div className="relative w-full aspect-square">
            <Image
                src={photo.image}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={photo.title}
                className="object-cover rounded-xl"
                />

                <Chip size="sm" className="absolute right-2 top-2">{photo.category}</Chip>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h2 className="font-semibold text-lg leading-tight">{photo.title}</h2>
                    <p className="text-sm text-default-500 line-clamp-2">{photo.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold">{photo.currency} {photo.price}</p>
                    <p className="text-default-500">{photo.material}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-default-500">
                    <span>{photo.dimensions}</span>
                    <span>{photo.inStock ? "In stock" : "Out of stock"}</span>
                </div>
            </div>

           <Separator />

     <Link href={`/all-photos/${photo.id}`}>      <Button variant="outline" className={'w-full'}>View Details <FaArrowRight /></Button></Link>
            
        </Card>
    );
};

export default TilesCard;