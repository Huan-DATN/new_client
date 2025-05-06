import OrderEdit from '@/features/seller/order/[id]/edit/order-edit';

function Page({ params }: { params: { id: number; locale: string } }) {
	return <OrderEdit id={params.id} />;
}

export default Page;
