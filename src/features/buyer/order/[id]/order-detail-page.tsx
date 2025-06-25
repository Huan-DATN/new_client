import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrderDetail from './order-detail';

async function OrderDetailPage({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	return (
		<div className="container mx-auto">
			<OrderDetail sessionToken={sessionToken} id={Number(id)} />
		</div>
	);
}

export default OrderDetailPage;
