import { Package } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrdersList from './orders-list';

async function OrdersListPage() {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="flex flex-col space-y-6 p-6">
			<div className="flex flex-col space-y-2">
				<div className="flex items-center gap-2">
					<Package className="h-5 w-5 text-primary" />
					<h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
				</div>
				<p className="text-muted-foreground">
					Xem và quản lý các đơn hàng từ khách hàng của bạn
				</p>
			</div>

			<OrdersList sessionToken={sessionToken} />
		</div>
	);
}

export default OrdersListPage;
