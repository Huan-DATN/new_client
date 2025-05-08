import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '../../../../components/product-card';

// Define a simplified product type based on actual usage
type ProductType = {
	id: number;
	name: string;
	price: number;
	images?: { publicUrl: string }[];
	[key: string]: any; // Allow for other properties
};

async function ProductSimilar({ data }: { data: ProductType }) {
	// Fetch similar products based on same category
	let similarProducts: ProductType[] = [];

	return (
		<div className="relative">
			<Carousel
				opts={{
					align: 'start',
					loop: similarProducts.length > 4
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{similarProducts.length > 0 ? (
						similarProducts.map((product) => (
							<CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
								<div className="p-1">
									<ProductCard data={product} />
								</div>
							</CarouselItem>
						))
					) : (
						// Fallback to show the original product if no similar products found
						Array.from({ length: 4 }).map((_, index) => (
							<CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
								<div className="p-1">
									<ProductCard data={data} />
								</div>
							</CarouselItem>
						))
					)}
				</CarouselContent>
				<CarouselPrevious className="hidden md:flex left-0" />
				<CarouselNext className="hidden md:flex right-0" />
			</Carousel>
		</div>
	);
}

export default ProductSimilar;
