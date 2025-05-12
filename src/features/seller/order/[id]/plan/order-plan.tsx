import commonRequest from '@/api/commonRequest';
import { ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormOrderPlan from './form-order-plan';

async function OrderPlan({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}

	// Fetch the statuses
	const { payload } = await commonRequest.getAllStatus();
	const statuses = payload.data;

	return (
		<div className="container max-w-4xl mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<Link
					href={`/seller/order/${id}`}
					className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Quay lại chi tiết đơn hàng
				</Link>
				<h1 className="text-xl font-bold">Lập kế hoạch đơn hàng #{id}</h1>
			</div>

			<FormOrderPlan
				id={id}
				statuses={statuses}
				sessionToken={sessionToken}
			/>
		</div>
	);
}

export default OrderPlan;
