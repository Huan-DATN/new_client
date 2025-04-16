'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { CityListResType } from '@/schemaValidations/response/common';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CityFilter({ data }: { data: CityListResType['data'] }) {
	const params = useSearchParams();
	const checkedCityId = params.get('cityId') || undefined;
	const checkedGroupProductId = params.get('groupProductId') || undefined;
	const checkedName = params.get('name') || undefined;
	const checkedPage = params.get('page') || undefined;

	return (
		<div className="flex flex-col gap-2 px-5">
			{data.map((item) => (
				<div key={item.id} className="flex items-center gap-2">
					<Link
						href={
							item.id === Number(checkedCityId)
								? {
										pathname: '/buyer/products',
										query: {
											cityId: undefined,
											groupProductId: checkedGroupProductId,
											name: checkedName,
											page: 1,
										},
								  }
								: {
										pathname: '/buyer/products',
										query: {
											cityId: item.id,
											groupProductId: checkedGroupProductId,
											name: checkedName,
											page: 1,
										},
								  }
						}
					>
						<Checkbox
							id={`city-${item.id}`}
							checked={item.id === Number(checkedCityId)}
						/>
					</Link>
					<label htmlFor={`city-${item.id}`} className="text-sm text-gray-700">
						{item.name}
					</label>
				</div>
			))}
		</div>
	);
}

export default CityFilter;
