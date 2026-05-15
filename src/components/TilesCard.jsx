import { Button, Card, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const TilesCard = ({tile}) => {
    return (
        <Card className="border rounded-xl overflow-hidden">
            <div className="relative w-full aspect-square">
            <Image
                src={tile.image}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={tile.title}
                className="object-cover rounded-xl"
                />

                <Chip size="sm" className="absolute right-2 top-2">{tile.category}</Chip>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h2 className="font-semibold text-lg leading-tight">{tile.title}</h2>
                    <p className="text-sm text-default-500 line-clamp-2">{tile.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold">{tile.currency} {tile.price}</p>
                    <p className="text-default-500">{tile.material}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-default-500">
                    <span>{tile.dimensions}</span>
                    <span>{tile.inStock ? "In stock" : "Out of stock"}</span>
                </div>
            </div>

           <Separator />

      <Link href={`/all-tiles/${tile.id}`}>      <Button variant="outline" className={'w-full'}>View Details <FaArrowRight /></Button></Link>
            
        </Card>
    );
};

export default TilesCard;