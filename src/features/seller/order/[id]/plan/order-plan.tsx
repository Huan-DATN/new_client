import commonRequest from '@/api/commonRequest';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FormOrderPlan from './form-order-plan';

async function OrderPlan({ id }: { id: number }) {
	const sessionToken = (await cookies()).get('sessionToken')?.value;
	if (!sessionToken) {
		redirect('/auth/login');
	}
	const { payload } = await commonRequest.getAllStatus();

	return (
		<FormOrderPlan
			id={id}
			statuses={payload.data}
			sessionToken={sessionToken}
		/>
	);
}

export default OrderPlan;
