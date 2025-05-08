import { OrderStatusEnum } from '../constants/orderStatusEnum';

function StatusComponent({ status }: { status: OrderStatusEnum }) {
	const statusStyles = {
		[OrderStatusEnum.PENDING]: 'yellow-500',
		[OrderStatusEnum.CONFIRMED]: 'blue-500',
		[OrderStatusEnum.PROCESSING]: 'orange-500',
		[OrderStatusEnum.SHIPPED]: 'green-500',
		[OrderStatusEnum.DELIVERED]: 'green-500',
		[OrderStatusEnum.CANCELLED]: 'red-500',
		[OrderStatusEnum.RETURNED]: 'pink-500',
		[OrderStatusEnum.FAILED]: 'gray-500',
	};

	const statusIcons = {
		[OrderStatusEnum.PENDING]: '⏳',
		[OrderStatusEnum.CONFIRMED]: '✅',
		[OrderStatusEnum.PROCESSING]: '🔄',
		[OrderStatusEnum.SHIPPED]: '📦',
		[OrderStatusEnum.DELIVERED]: '📬',
		[OrderStatusEnum.CANCELLED]: '❌',
		[OrderStatusEnum.RETURNED]: '🔙',
		[OrderStatusEnum.FAILED]: '❗',
	};

	return (
		<div
			className={`flex items-center text-${statusStyles[status]} border-2 border-${statusStyles[status]} rounded-full px-2 py-1`}
		>
			<span className="mr-2">{statusIcons[status]}</span>
			<span>{status}</span>
		</div>
	);
}

export default StatusComponent;
