import OrderDetail from '@/features/admin/order/[id]/order-detail';

interface AdminOrderDetailPageProps {
	params: {
		id: string;
	};
}

export default function AdminOrderDetailPage({
	params,
}: AdminOrderDetailPageProps) {
	return <OrderDetail id={parseInt(params.id)} />;
}
