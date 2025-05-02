import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrdersList from './orders-list';

async function OrdersListPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="flex flex-col m-5">
			<div className="flex flex-row justify-between items-center">
				<h1 className="font-bold">Các sản phẩm của cửa hàng</h1>
			</div>

			<OrdersList sessionToken={sessionToken} />
		</div>
	);
}

export default OrdersListPage;
