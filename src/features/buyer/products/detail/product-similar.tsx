import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import ProductCard from '../../../../components/product-card';

function ProductSimilar({ data }: any) {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className="w-full mt-5"
		>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
						<div className="p-1">
							<ProductCard data={data} />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

export default ProductSimilar;
