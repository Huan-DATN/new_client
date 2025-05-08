'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Slider } from '../../../../components/ui/slider';

// Client component for price range filter
function ClientPriceFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const minPrice = searchParams.get('minPrice') || '0';
	const maxPrice = searchParams.get('maxPrice') || '10000000';
	const pathname = usePathname();

	const [priceRange, setPriceRange] = useState<[number, number]>([
		parseInt(minPrice),
		parseInt(maxPrice)
	]);
	const [inputMin, setInputMin] = useState(minPrice);
	const [inputMax, setInputMax] = useState(maxPrice);

	// Format price for display
	const formatPrice = (price: number | string) => {
		return new Intl.NumberFormat('vi-VN').format(Number(price));
	};

	// Apply filter
	const applyPriceFilter = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (priceRange[0] > 0) {
			params.set('minPrice', priceRange[0].toString());
		} else {
			params.delete('minPrice');
		}

		if (priceRange[1] < 10000000) {
			params.set('maxPrice', priceRange[1].toString());
		} else {
			params.delete('maxPrice');
		}

		// Use replace with scroll: false to prevent the page from scrolling/reloading
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// Handle slider change
	const handleSliderChange = (values: number[]) => {
		const [min, max] = values;
		setPriceRange([min, max]);
		setInputMin(min.toString());
		setInputMax(max.toString());
	};

	// Predefined price ranges
	const priceRanges = [
		{ label: 'Dưới 100,000₫', min: 0, max: 100000 },
		{ label: '100,000₫ - 500,000₫', min: 100000, max: 500000 },
		{ label: '500,000₫ - 1,000,000₫', min: 500000, max: 1000000 },
		{ label: 'Trên 1,000,000₫', min: 1000000, max: 10000000 },
	];

	return (
		<div className="space-y-4">
			<div className="pt-4">
				<Slider
					defaultValue={priceRange}
					min={0}
					max={10000000}
					step={50000}
					value={priceRange}
					onValueChange={handleSliderChange}
					className="my-6"
				/>

				<div className="flex justify-between items-center gap-2 mt-2">
					<Input
						type="text"
						value={inputMin}
						onChange={(e) => setInputMin(e.target.value)}
						onBlur={() => {
							const val = parseInt(inputMin) || 0;
							setPriceRange([val, priceRange[1]]);
						}}
						className="text-sm"
						placeholder="Min"
					/>
					<span className="text-gray-500">-</span>
					<Input
						type="text"
						value={inputMax}
						onChange={(e) => setInputMax(e.target.value)}
						onBlur={() => {
							const val = parseInt(inputMax) || 10000000;
							setPriceRange([priceRange[0], val]);
						}}
						className="text-sm"
						placeholder="Max"
					/>
				</div>
			</div>

			<div className="space-y-2 border-t border-gray-100 pt-3">
				{priceRanges.map((range, index) => (
					<div
						key={index}
						className="text-sm py-1.5 px-2 rounded-md cursor-pointer hover:bg-gray-50"
						onClick={() => {
							setPriceRange([range.min, range.max]);
							setInputMin(range.min.toString());
							setInputMax(range.max.toString());
						}}
					>
						{range.label}
					</div>
				))}
			</div>

			<Button
				onClick={applyPriceFilter}
				className="w-full bg-green-600 hover:bg-green-700 text-sm h-9"
			>
				Áp dụng
			</Button>
		</div>
	);
}

export default ClientPriceFilter;
