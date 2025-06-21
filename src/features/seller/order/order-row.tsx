import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { getDateFormat, getPriceFormat } from '../../../lib/utils';
import { OrderListResType } from '../../../schemaValidations/response/order';
import OrderStatusBadge from '../order/[id]/order-status-badge';
import PaymentTypeBadge from './payment-type-badge';

function OrderRow({ data }: { data: OrderListResType['data'][number] }) {
	// Get latest status
	const latestStatus = data.OrderStatus[data.OrderStatus.length - 1]
		?.status || { id: 0, type: 'PENDING', name: 'Chờ xử lý' };

	return (
		<div className="grid grid-cols-6 items-center p-4 text-sm hover:bg-muted/30 transition-colors">
			<div className="font-medium">#MH{data.id}</div>

			<div>{getDateFormat(new Date(data.createdAt))}</div>

			<div className="font-medium">{getPriceFormat(data.total)}</div>

			<div className="flex">
				<OrderStatusBadge status={latestStatus} size="sm" />
			</div>

			<div className="flex">
				<PaymentTypeBadge paymentType={data.paymentMethod as any} />
			</div>

			<div className="flex justify-center">
				<Button asChild variant="ghost" size="sm" className="gap-1">
					<Link href={`/seller/order/${data.id}`}>
						<Eye className="h-4 w-4" />
						<span>Chi tiết</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default OrderRow;
