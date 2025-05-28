import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { cn, getDateFormat, getPriceFormat } from '@/lib/utils';
import { OrderListResType } from '@/schemaValidations/response/order';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type Status = {
	id: number;
	type: string;
	name: string;
};

type OrderStatusBadgeProps = {
	status: Status;
	size?: 'sm' | 'lg';
};

function OrderStatusBadge({ status, size = 'sm' }: OrderStatusBadgeProps) {
	const getStatusColor = (type: string) => {
		switch (type) {
			case OrderStatusEnum.PENDING:
				return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
			case OrderStatusEnum.CONFIRMED:
				return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
			case OrderStatusEnum.PROCESSING:
				return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100';
			case OrderStatusEnum.SHIPPED:
				return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
			case OrderStatusEnum.DELIVERED:
				return 'bg-green-100 text-green-800 hover:bg-green-100';
			case OrderStatusEnum.CANCELLED:
				return 'bg-red-100 text-red-800 hover:bg-red-100';
			default:
				return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
		}
	};

	return (
		<Badge
			variant="outline"
			className={cn(
				getStatusColor(status.type),
				size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1'
			)}
		>
			{status.name}
		</Badge>
	);
}

function OrderRow({ data }: { data: OrderListResType['data'][number] }) {
	// Get latest status
	const latestStatus = data.OrderStatus[data.OrderStatus.length - 1]
		?.status || { id: 0, type: 'PENDING', name: 'Chờ xử lý' };

	return (
		<div className="grid grid-cols-6 items-center p-4 text-sm hover:bg-muted/30 transition-colors">
			<div className="font-medium">#MH{data.id}</div>

			<div className="font-medium">
				{data.shop?.shopName || `Shop #${data.shop?.id}`}
			</div>

			<div>{getDateFormat(new Date(data.createdAt))}</div>

			<div className="font-medium">{getPriceFormat(data.total)}</div>

			<div>
				<OrderStatusBadge status={latestStatus} size="sm" />
			</div>

			<div className="flex justify-center">
				<Button asChild variant="ghost" size="sm" className="gap-1">
					<Link href={`/admin/order/${data.id}`}>
						<Eye className="h-4 w-4" />
						<span>Chi tiết</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default OrderRow;
