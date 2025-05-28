import { Badge } from '@/components/ui/badge';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { cn } from '@/lib/utils';

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
			case OrderStatusEnum.PREPARING:
				return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100';
			case OrderStatusEnum.SHIPPING:
				return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
			case OrderStatusEnum.DELIVERED:
				return 'bg-green-100 text-green-800 hover:bg-green-100';
			case OrderStatusEnum.COMPLETED:
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

export default OrderStatusBadge;
