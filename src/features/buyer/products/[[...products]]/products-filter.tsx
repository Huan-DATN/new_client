import commonRequest from '@/api/commonRequest';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Filter,
	MapPin,
	MoveDown,
	Star,
	Tags
} from 'lucide-react';
import CityFilter from './city-filter';
import ClientFilterReset from './filter-reset';
import ClientGroupProductFilter from './group-products-filter';
import ClientPriceFilter from './price-filter';
import ClientRatingFilter from './rating-filter';

async function ProductsFilter() {
	const cityResponse = await commonRequest.getAllCities();
	const cities = cityResponse.payload.data;

	const groupResponse = await commonRequest.getAllGroupProducts();
	const productGroups = groupResponse.payload.data;

	return (
		<div className="p-4 overflow-auto max-h-screen">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-gray-900 flex items-center">
					<Filter className="w-5 h-5 mr-2 text-green-600" />
					Bộ lọc
				</h3>

				<ClientFilterReset />
			</div>

			{/* Location Filter */}
			<Accordion type="single" collapsible defaultValue="city" className="mb-4">
				<AccordionItem value="city" className="border border-gray-200 rounded-md">
					<AccordionTrigger className="px-4 py-3 text-sm font-medium flex items-center">
						<MapPin className="w-4 h-4 mr-2 text-green-600" />
						<span>Địa điểm</span>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<CityFilter data={cities} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Category Filter */}
			<Accordion type="single" collapsible defaultValue="category" className="mb-4">
				<AccordionItem value="category" className="border border-gray-200 rounded-md">
					<AccordionTrigger className="px-4 py-3 text-sm font-medium flex items-center">
						<Tags className="w-4 h-4 mr-2 text-green-600" />
						<span>Danh mục sản phẩm</span>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<ClientGroupProductFilter categories={productGroups} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Price Filter */}
			<Accordion type="single" collapsible defaultValue="price" className="mb-4">
				<AccordionItem value="price" className="border border-gray-200 rounded-md">
					<AccordionTrigger className="px-4 py-3 text-sm font-medium flex items-center">
						<MoveDown className="w-4 h-4 mr-2 text-green-600" />
						<span>Khoảng giá</span>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<ClientPriceFilter />
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Rating Filter */}
			<Accordion type="single" collapsible className="mb-4">
				<AccordionItem value="rating" className="border border-gray-200 rounded-md">
					<AccordionTrigger className="px-4 py-3 text-sm font-medium flex items-center">
						<Star className="w-4 h-4 mr-2 text-green-600" />
						<span>Đánh giá</span>
					</AccordionTrigger>
					<AccordionContent className="px-4 pb-4">
						<ClientRatingFilter />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}





export default ProductsFilter;
