'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { OrderEnum } from '../../../constants/orderEnum';
function OrderBox() {
	const router = useRouter();
	const [orderBy, setOrderBy] = useState<{
		orderBy: string;
		order: string;
	}>(OrderEnum.latest);

	const handleOrderChangeChange = (newOrder: keyof typeof OrderEnum) => {
		const newParams = new URLSearchParams(window.location.search);
		if (newParams.get('page')) {
			newParams.delete('page');
		}

		newParams.set('orderBy', OrderEnum[newOrder].orderBy);
		newParams.set('order', OrderEnum[newOrder].order);

		router.push(`/admin/product?${newParams.toString()}`);
	};

	return (
		<select
			className="text-sm border rounded-md px-2 py-1 bg-white"
			onChange={(e) => {
				handleOrderChangeChange(e.target.value as keyof typeof OrderEnum);
			}}
		>
			<option value="latest">Mới nhất</option>
			<option value="oldest">Cũ nhất</option>
			<option value="price_asc">Giá tăng dần</option>
			<option value="price_desc">Giá giảm dần</option>
			<option value="name_asc">Tên A-Z</option>
			<option value="name_desc">Tên Z-A</option>
		</select>
	);
}

export default OrderBox;
