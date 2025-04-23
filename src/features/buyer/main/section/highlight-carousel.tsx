import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
// Assuming you have a type for your data
const hardData = [
	{
		id: 1,
		title: 'Item 1',
		src: 'https://dyh48pub5c8mm.cloudfront.net/home/adv/s3_2024050822330430136.png',
	},
	{
		id: 2,
		title: 'Item 2',
		src: 'https://dyh48pub5c8mm.cloudfront.net/home/adv/s3_2025012213591594491.png',
	},
];

function HighlightCarousel({ data }: { data: any }) {
	return (
		<Carousel className="w-full max-w-xl">
			<CarouselContent>
				{hardData.map((item: any) => (
					<CarouselItem key={item.id}>
						<Image
							src={item.src || 'https://placehold.co/600x400/png'}
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
