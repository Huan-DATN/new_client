'use client';

import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { useRouter } from 'next/navigation';
import orderRequest from '../../api/orderRequest';
import { Button } from '../../components/ui/button';
import { handleErrorApi } from '../../lib/utils';

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
		status: any;
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
		// Handle click event for each status

		// Optionally, you can refresh the data or perform any other action after the click
	};

	return (
		<ol className="relative border-s border-gray-200 dark:border-gray-700">
			{data?.map((item, index) => (
				<li className="mb-10 ms-4" key={index}>
					{item.isActive ? (
						<div className="absolute w-3 h-3 bg-green-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					) : (
						<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					)}
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						{'Dự kiến: '}
						{new Date(item.date).toLocaleDateString('vi-VN', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						})}
					</time>
					{isSeller ? (
						item.isActive ? (
							<>
								<h3 className="text-lg font-semibold leading-none text-green-500 dark:text-gray-500">
									{item.status.type}
								</h3>
								<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
									{'Đã hoàn thành: '}
									{new Date(item.updatedAt).toLocaleDateString('vi-VN', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
									})}
								</time>
							</>
						) : (
							<>
								<h3 className="text-lg font-semibold leading-none text-red-500 dark:text-gray-500">
									{item.status.type}
								</h3>
								<Button
									className="border-1 border-blue-500 text-sm mt-2 hover:bg-blue-400 max-w-1/2!"
									onClick={() => handleClick(item.status.id)}
									variant="outline"
								>
									Hoàn thành
								</Button>
							</>
						)
					) : (
						<h3 className="text-lg font-semibold leading-none text-gray-900 dark:text-gray-500">
							{item.status.type}
						</h3>
					)}
				</li>
			))}
		</ol>
	);
}

export default OrderTimeLine;
