'use client';

import orderRequest from '@/api/orderRequest';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrderListResType } from '../../../schemaValidations/response/order';
import OrdersPagination from './order-pagination';
import OrderRow from './order-row';

function OrdersList({ sessionToken }: { sessionToken: string }) {
	const params = useSearchParams();
	const page = params.get('page') || 1;
	const limit = params.get('limit') || 10;

	const [orders, setOrders] = useState<OrderListResType['data']>([]);
	const [totalPages, setTotalPages] =
		useState<OrderListResType['meta']['totalPages']>(0);

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await orderRequest.getAllOrders(sessionToken, {
				page: Number(page),
				limit: Number(limit),
			});
			return response.payload;
		};

		fetchOrders()
			.then((res) => {
				setOrders(res.data);
				setTotalPages(res.meta.totalPages);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [page, limit, sessionToken]);

	return (
		<div>
			{orders.map((order) => (
				<OrderRow key={order.id} data={order} />
			))}
			<OrdersPagination totalPages={totalPages} />
		</div>
	);
}

export default OrdersList;
