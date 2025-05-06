import OrderPlan from '../../../../../../features/seller/order/[id]/plan/order-plan';

function Page({ params }: { params: { id: number; locale: string } }) {
	return <OrderPlan id={params.id} />;
}

export default Page;
