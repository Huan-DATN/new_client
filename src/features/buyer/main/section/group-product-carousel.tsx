'use client';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel';
import { GroupProductsListResType } from '@/schemaValidations/response/common';
import Link from 'next/link';
import { useState } from 'react';

// Sample placeholder data in case real data is not available
const placeholderData = [
	{ id: 1, name: 'Rau củ' },
	{ id: 2, name: 'Trái cây' },
	{ id: 3, name: 'Thịt & Cá' },
	{ id: 4, name: 'Sữa & Trứng' },
	{ id: 5, name: 'Đồ uống' },
	{ id: 6, name: 'Bánh kẹo' },
	{ id: 7, name: 'Thực phẩm khô' },
	{ id: 8, name: 'Gia vị' },
];

// Get color by index for category icons
const getCategoryColor = (index: number) => {
	const colors = [
		'bg-green-100 text-green-700',
		'bg-blue-100 text-blue-700',
		'bg-red-100 text-red-700',
		'bg-yellow-100 text-yellow-700',
		'bg-purple-100 text-purple-700',
		'bg-pink-100 text-pink-700',
		'bg-indigo-100 text-indigo-700',
		'bg-teal-100 text-teal-700',
	];
	return colors[index % colors.length];
};

// Get icon by index for category
const getCategoryIcon = (index: number) => {
	// Array of SVG paths for different category icons
	const icons = [
		<path key="1" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.633.708l-1.168-1.168a3 3 0 00-.879-2.12l-1.168-1.168a4 4 0 002.633-.708l1.168 1.168a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.633.708l-1.168-1.168a3 3 0 00-.879-2.12l-1.168-1.168a4 4 0 002.633-.708l1.168 1.168a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.633.708l-1.168-1.168a3 3 0 00-.879-2.12z" />,
		<path key="2" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" />,
		<path key="3" d="M6 17.982V13.05a2.5 2.5 0 01-1.38-2.232v-.013a2.5 2.5 0 012.5-2.5h.019a4.987 4.987 0 01-.007-.232v-3.5c.005-.52.009-1.548 2.701-1.548 2.692 0 2.696 1.028 2.701 1.548v3.5c0 .08-.002.156-.007.232a2.5 2.5 0 012.519 2.5v.013a2.5 2.5 0 01-1.38 2.232v4.932M8 11c.552 0 .98-.452 1-1V5.127c-.018-.529-.143-1-1-1s-.982.471-1 1V10c.02.548.448 1 1 1zm4.054 0c.552 0 .98-.452 1-1V5.127c-.018-.529-.143-1-1-1s-.982.471-1 1V10c.02.548.448 1 1 1z" />,
		<path key="4" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />,
		<path key="5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
		<path key="6" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />,
		<path key="7" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
		<path key="8" d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />,
	];
	return icons[index % icons.length];
};

function GroupProductCarousel({
	data,
}: {
	data: GroupProductsListResType['data'];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const displayData = data?.length > 0 ? data : placeholderData;

	return (
		<div className="relative">
			<Carousel
				className="w-full"
				setApi={setApi}
				opts={{
					align: "start",
				}}
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{displayData.map((item, index) => (
						<CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
							<Link
								className="flex flex-col items-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
								href={`/buyer/products/?groupProductId=${item.id}`}
							>
								<div className={`flex items-center justify-center w-16 h-16 rounded-full ${getCategoryColor(index)} mb-3`}>
									<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										{getCategoryIcon(index)}
									</svg>
								</div>
								<span className="text-center text-sm font-medium mt-2">
									{item.name}
								</span>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
				<CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
			</Carousel>
		</div>
	);
}

export default GroupProductCarousel;
