import { OrderStatusEnum } from '../constants/orderStatusEnum';

function StatusComponent({ status }: { status: OrderStatusEnum }) {
	const statusStyles = {
		[OrderStatusEnum.PENDING]: 'text-yellow-500',
		[OrderStatusEnum.CONFIRMED]: 'text-blue-500',
		[OrderStatusEnum.PROCESSING]: 'text-orange-500',
		[OrderStatusEnum.SHIPPED]: 'text-green-500',
		[OrderStatusEnum.DELIVERED]: 'text-purple-500',
		[OrderStatusEnum.CANCELLED]: 'text-red-500',
		[OrderStatusEnum.RETURNED]: 'text-pink-500',
		[OrderStatusEnum.FAILED]: 'text-gray-500',
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
		<div className={`flex items-center ${statusStyles[status]}`}>
			<span className="mr-2">{statusIcons[status]}</span>
			<span>{status}</span>
		</div>
	);
}

export default StatusComponent;
