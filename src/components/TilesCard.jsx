import { Button, Card, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const TilesCard = ({tile}) => {
    return (
        <Card className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full aspect-square">
            <Image
                src={tile.image}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                alt={tile.title}
                className="object-cover rounded-xl"
                />

                <Chip size="sm" className="absolute right-2 top-2 text-xs md:text-sm">{tile.category}</Chip>
            </div>

            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                <div>
                    <h2 className="font-semibold text-base md:text-lg leading-tight line-clamp-1">{tile.title}</h2>
                    <p className="text-xs md:text-sm text-default-500 line-clamp-2">{tile.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm">
                    <p className="font-semibold">{tile.currency} {tile.price}</p>
                    <p className="text-default-500 truncate">{tile.material}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-default-500">
                    <span className="truncate">{tile.dimensions}</span>
                    <span>{tile.inStock ? "In stock" : "Out of stock"}</span>
                </div>
            </div>

           <Separator />

      <Link href={`/all-tiles/${tile.id}`}>      <Button variant="outline" className={'w-full'}>View Details <FaArrowRight /></Button></Link>
            
        </Card>
    );
};

export default TilesCard;