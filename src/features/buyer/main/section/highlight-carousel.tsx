'use client';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Assuming you have a type for your data
const hardData = [
	{
		id: 1,
		title: 'Sản phẩm hữu cơ',
		src: 'https://dyh48pub5c8mm.cloudfront.net/home/adv/s3_2024050822330430136.png',
		link: '/buyer/products?category=organic'
	},
	{
		id: 2,
		title: 'Rau củ tươi ngon',
		src: 'https://dyh48pub5c8mm.cloudfront.net/home/adv/s3_2025012213591594491.png',
		link: '/buyer/products?category=vegetables'
	},
];

function HighlightCarousel({ data }: { data: any }) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	// Use hardcoded data if no data is provided
	const carouselData = data || hardData;

	useEffect(() => {
		if (!api) return;

		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", handleSelect);
		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	return (
		<div className="relative">
			<Carousel
				className="w-full"
				setApi={setApi}
				opts={{
					loop: true,
					align: "start",
				}}
			>
				<CarouselContent>
					{carouselData.map((item: any) => (
						<CarouselItem key={item.id}>
							<Link href={item.link || '#'}>
								<div className="relative aspect-[16/6] w-full overflow-hidden rounded-lg">
									<Image
										src={item.src || 'https://placehold.co/1200x600/png'}
										alt={item.title || `Carousel item ${item.id}`}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 hover:scale-105"
										priority={item.id === 1}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
									<div className="absolute bottom-6 left-6 right-6">
										<h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">{item.title}</h3>
									</div>
								</div>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
				<CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
			</Carousel>

			<div className="absolute bottom-3 left-0 right-0">
				<div className="flex items-center justify-center gap-2">
					{carouselData.map((_: any, index: number) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full transition-all ${current === index ? "bg-white w-3 h-3" : "bg-white/50"}`}
							onClick={() => api?.scrollTo(index)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default HighlightCarousel;
