import OrderDetail from '@/features/buyer/order/[id]/order-detail';

function Page({ params }: { params: { id: number } }) {
	return <OrderDetail id={params.id} />;
}

export default Page;
