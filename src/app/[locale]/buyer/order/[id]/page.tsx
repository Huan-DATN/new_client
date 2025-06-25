import OrderDetailPage from '@/features/buyer/order/[id]/order-detail-page';

async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;

	return <OrderDetailPage id={Number(id)} />;
}

export default Page;
