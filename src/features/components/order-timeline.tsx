'use client';

import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import orderRequest from '../../api/orderRequest';
import { Button } from '../../components/ui/button';
import { handleErrorApi } from '../../lib/utils';
import OrderStatusBadge from '../seller/order/[id]/order-status-badge';

const OrderStatusArray = [
	OrderStatusEnum.PENDING,
	OrderStatusEnum.CONFIRMED,
	OrderStatusEnum.PROCESSING,
	OrderStatusEnum.SHIPPED,
	OrderStatusEnum.DELIVERED,
	OrderStatusEnum.CANCELLED,
	OrderStatusEnum.RETURNED,
	OrderStatusEnum.FAILED,
];

function OrderTimeLine({
	id,
	data,
	isSeller = false,
}: {
	id: number;
	data: {
		status: {
			id: number;
			type: string;
			name: string;
		};
		date: Date;
		isActive: boolean;
		updatedAt: Date;
	}[];
	isSeller?: boolean;
}) {
	const router = useRouter();
	const handleClick = async (statusId: number) => {
		try {
			await orderRequest.updateOrderStatus(id, {
				statusId: statusId,
			});
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return (
		<ol className="relative border-s border-gray-200 dark:border-gray-700">
			{data?.map((item, index) => (
				<li className="mb-6 ms-4 last:mb-0" key={index}>
					{/* Status marker */}
					<div
						className={`absolute w-3 h-3 ${item.isActive ? 'bg-green-500' : 'bg-gray-200'} rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900`}
					/>

					{/* Status content */}
					<div className="flex flex-col space-y-1.5">
						{/* Expected date */}
						<div className="flex items-center text-sm text-muted-foreground">
							<Clock className="h-3.5 w-3.5 mr-1" />
							<span>Dự kiến: {new Date(item.date).toLocaleDateString('vi-VN', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							})}</span>
						</div>

						{/* Status badge with name */}
						<div className="flex items-center">
							<OrderStatusBadge status={item.status} size="md" />
						</div>

						{/* Completed date if active */}
						{item.isActive && (
							<div className="flex items-center text-sm text-green-600">
								<CheckCircle className="h-3.5 w-3.5 mr-1" />
								<span>Hoàn thành: {new Date(item.updatedAt).toLocaleDateString('vi-VN', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}</span>
							</div>
						)}

						{/* Button for seller to update status */}
						{isSeller && !item.isActive && (
							<Button
								className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 h-8 text-xs rounded-md"
								onClick={() => handleClick(item.status.id)}
							>
								Đánh dấu hoàn thành
							</Button>
						)}
					</div>
				</li>
			))}
		</ol>
	);
}

export default OrderTimeLine;
