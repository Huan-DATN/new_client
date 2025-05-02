import { cookies } from 'next/headers';
import orderRequest from '../../../../api/orderRequest';
import OrderCard from './order-card';

async function OrdersPage() {
	const sessionToken = (await cookies().get('sessionToken'))?.value;
	if (!sessionToken) {
		return (
			<div className="text-center">Vui lòng đăng nhập để xem đơn hàng</div>
		);
	}

	const response = await orderRequest.getAllOrders(sessionToken);
	return (
		<div className="flex flex-col w-1/2 mx-auto mt-5">
			<h1 className="text-2xl font-bold">Đơn hàng của bạn</h1>
			{response.payload.data.map((order) => (
				<div key={order.id} className="border p-4 my-2">
					<OrderCard data={order} />
				</div>
			))}
		</div>
	);
}

export default OrdersPage;
