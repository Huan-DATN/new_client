'use client';
import userRequest from '@/api/userRequest';
import { ShopsListResType } from '@/schemaValidations/response/user';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShopsGrid from './shops-grid';

function ShopsGridSection() {
	const params = useSearchParams();
	const checkedPage = params.get('page') || null;

	const [shops, setShops] = useState<ShopsListResType['data']>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const isActive = true;
			const response = await userRequest.getActiveShops(
				{ page: Number(checkedPage) },
				isActive
			);
			setShops(response.payload.data);
			setTotalPages(response.payload.meta.totalPages);
			setTotalItems(response.payload.meta.total);
		}
		fetchData();
	}, [checkedPage]);
	return (
		<div className="flex flex-col gap-2 w-full h-full mt-5">
			<div className="flex flex-col gap-2 px-5">
				<span>
					Hiện có <span>{}</span> sản phẩm cùng danh mục
				</span>
			</div>

			<div className="flex flex-col gap-2 px-5">
				<ShopsGrid data={shops} col={3} />
			</div>

			<div></div>
		</div>
	);
}

export default ShopsGridSection;
