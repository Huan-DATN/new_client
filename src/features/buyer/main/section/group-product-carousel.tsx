import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";

function GroupProductCarousel() {
  return (
    <Carousel className='mt-5'>
      <CarouselContent>
        <CarouselItem className='basis-1/5'>
          <div className='flex flex-col items-center'>
            <Image
              src={`https://placehold.co/600x400/png`}
              alt={`Carousel item`}
              width={300}
              height={300}
            />
            <span className='text-center text-sm font-bold mt-2'>
              Thời trang
            </span>
          </div>
        </CarouselItem>
        <CarouselItem className='basis-1/5'>
          <Image
            src={`https://placehold.co/600x400/png`}
            alt={`Carousel item`}
            width={300}
            height={300}
          />
        </CarouselItem>
        <CarouselItem className='basis-1/5'>
          <Image
            src={`https://placehold.co/600x400/png`}
            alt={`Carousel item`}
            width={300}
            height={300}
          />
        </CarouselItem>
        <CarouselItem className='basis-1/5'>
          <Image
            src={`https://placehold.co/600x400/png`}
            alt={`Carousel item`}
            width={300}
            height={300}
          />
        </CarouselItem>
        <CarouselItem className='basis-1/5'>
          <Image
            src={`https://placehold.co/600x400/png`}
            alt={`Carousel item`}
            width={300}
            height={300}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default GroupProductCarousel;
