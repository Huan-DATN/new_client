import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { GroupProductsListResType } from '@/schemaValidations/response/common';
import Image from 'next/image';
import Link from 'next/link';

function GroupProductCarousel({
	data,
}: {
	data: GroupProductsListResType['data'];
}) {
	return (
		<Carousel className="mt-5">
			<CarouselContent>
				{data.map((item) => (
					<CarouselItem className="basis-1/5">
						<Link
							className="flex flex-col items-center"
							href={`/buyer/products/?groupProductId=${item.id}`}
						>
							<Image
								src={`https://placehold.co/600x400/png`}
								alt={`Carousel item`}
								width={300}
								height={300}
							/>
							<span className="text-center text-sm font-bold mt-2">
								{item.name}
							</span>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

export default GroupProductCarousel;
