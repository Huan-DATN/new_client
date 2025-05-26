import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '../../../../components/product-card';
import { ProductListResType } from '../../../../schemaValidations/response/product';

async function ProductSimilar({ data }: { data: ProductListResType['data'] }) {
	// Fetch similar products based on same category

	return (
		<div className="relative">
			<Carousel
				opts={{
					align: 'start',
					loop: data.length > 4,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{data.length > 0
						? data.map((product) => (
								<CarouselItem
									key={product.id}
									className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
								>
									<div className="p-1">
										<ProductCard data={product} />
									</div>
								</CarouselItem>
						  ))
						: // Fallback to show the original product if no similar products found
						  Array.from({ length: 4 }).map((_, index) => (
								<CarouselItem
									key={index}
									className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
								>
									<div className="p-1">
										<ProductCard data={data} />
									</div>
								</CarouselItem>
						  ))}
				</CarouselContent>
				<CarouselPrevious className="hidden md:flex left-0" />
				<CarouselNext className="hidden md:flex right-0" />
			</Carousel>
		</div>
	);
}

export default ProductSimilar;
