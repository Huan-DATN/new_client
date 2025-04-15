import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
// Assuming you have a type for your data
const hardData = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
];

function HighlightCarousel({ data }: { data: any }) {
  return (
    <Carousel className='w-full max-w-xl'>
      <CarouselContent>
        {hardData.map((item: any) => (
          <CarouselItem key={item.id}>
            <Image
              src={`https://placehold.co/600x400/png`}
              alt={`Carousel item ${item.id}`}
              width={600}
              height={600}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default HighlightCarousel;
