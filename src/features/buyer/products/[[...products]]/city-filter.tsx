'use client';
import { CityListResType } from '@/schemaValidations/response/common';
import { useSearchParams } from 'next/navigation';

function CityFilter({ data }: { data: CityListResType['data'] }) {
	const params = useSearchParams();
	const checkedCityId = params.get('cityId') || undefined;
	const checkedGroupProductId = params.get('groupProductId') || undefined;
	const checkedName = params.get('name') || undefined;
	const checkedPage = params.get('page') || undefined;

	return (
		<div className="px-5">
			<select
				className="w-full p-2 border border-gray-300 rounded-md"
				value={checkedCityId || ''}
				onChange={(e) => {
					const selectedCityId = e.target.value || undefined;
					const query = {
						cityId: selectedCityId,
						groupProductId: checkedGroupProductId,
						name: checkedName,
					};
					// Remove the cityId from the query if it's empty
					if (!selectedCityId) {
						delete query.cityId;
					}
					// Remove the groupProductId from the query if it's empty
					if (!checkedGroupProductId) {
						delete query.groupProductId;
					}
					// Remove the name from the query if it's empty
					if (!checkedName) {
						delete query.name;
					}

					const queryString = new URLSearchParams(
						query as Record<string, string>
					).toString();
					window.location.href = `/buyer/products?${queryString}`;
				}}
			>
				<option value="">Thành phố</option>
				{data.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default CityFilter;
