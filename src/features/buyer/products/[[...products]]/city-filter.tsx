'use client';
import { CityListResType } from '@/schemaValidations/response/common';
import { Check } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function CityFilter({ data }: { data: CityListResType['data'] }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const checkedCityId = searchParams.get('cityId') || undefined;
	const pathname = usePathname();

	const handleCityChange = (cityId: string | undefined) => {
		const params = new URLSearchParams(searchParams.toString());

		// If clicking the already selected city, deselect it
		if (cityId === checkedCityId) {
			params.delete('cityId');
		} else if (cityId) {
			params.set('cityId', cityId);
		} else {
			params.delete('cityId');
		}

		// Remove page parameter to start at page 1
		params.delete('page');

		// Use replace with scroll: false to prevent the page from scrolling/reloading
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
			{/* All cities option */}
			<div
				className={`p-2 rounded-md cursor-pointer flex items-center ${
					!checkedCityId ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
				}`}
				onClick={() => handleCityChange(undefined)}
			>
				<div className={`w-4 h-4 mr-2 rounded-sm flex items-center justify-center ${
					!checkedCityId ? 'bg-green-600 text-white' : 'border border-gray-300'
				}`}>
					{!checkedCityId && <Check className="w-3 h-3" />}
				</div>
				<span className="text-sm">Tất cả</span>
			</div>

			{/* City list */}
			{data.map((city) => (
				<div
					key={city.id}
					className={`p-2 rounded-md cursor-pointer flex items-center ${
						checkedCityId === city.id.toString() ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
					}`}
					onClick={() => handleCityChange(city.id.toString())}
				>
					<div className={`w-4 h-4 mr-2 rounded-sm flex items-center justify-center ${
						checkedCityId === city.id.toString() ? 'bg-green-600 text-white' : 'border border-gray-300'
					}`}>
						{checkedCityId === city.id.toString() && <Check className="w-3 h-3" />}
					</div>
					<span className="text-sm">{city.name}</span>
				</div>
			))}
		</div>
	);
}

export default CityFilter;
