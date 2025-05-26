'use client';
import { carouselRequest } from '@/api/carouselRequest';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CarouselListResType } from '../../../../schemaValidations/response/carousel';

function HighlightCarousel() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [carouselData, setCarouselData] = useState<CarouselListResType['data']>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch carousel data
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await carouselRequest.getCarousel();

				if (response.payload) {
					setCarouselData(response.payload.data);
				}
				setError(null);
			} catch (err) {
				console.error('Error fetching carousel data:', err);
				setError('Failed to load carousel data. Showing fallback content.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Set up carousel event listeners
	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	// Show loading state
	if (loading) {
		return (
			<div className="w-full aspect-[16/6] bg-gray-100 animate-pulse rounded-lg"></div>
		);
	}

	// Show error with fallback data
	if (error && carouselData.length === 0) {
		return (
			<div className="w-full p-4 bg-red-50 text-red-500 rounded-lg">
				{error}
			</div>
		);
	}

	// If no carousel items, don't render the component
	if (carouselData.length === 0) {
		return null;
	}

	// Sort carousel items by order
	const sortedCarouselData = [...carouselData].sort(
		(a, b) => a.order - b.order
	);

	return (
		<div className="relative">
			<Carousel
				className="w-full"
				setApi={setApi}
				opts={{
					loop: true,
					align: 'start',
				}}
			>
				<CarouselContent>
					{sortedCarouselData.map((item) => (
						<CarouselItem key={item.id}>
							<Link href={item.linkUrl || '#'}>
								<div className="relative aspect-[16/6] w-full overflow-hidden rounded-lg">
									<Image
										src={
											item.image?.publicUrl ||
											'https://placehold.co/1200x600/png'
										}
										alt={item.title || `Carousel item ${item.id}`}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 hover:scale-105"
										priority={item.order === 1}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
									<div className="absolute bottom-6 left-6 right-6">
										<h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">
											{item.title}
										</h3>
									</div>
								</div>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
				<CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
			</Carousel>
		</div>
	);
}

export default HighlightCarousel;
