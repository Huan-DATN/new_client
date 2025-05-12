'use client';

import { DonutChart } from '@tremor/react';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { cn } from '../../../lib/utils';
import { AdminDashboardSystemResType } from '../../../schemaValidations/response/statistic';

function AdminDashboardPieChart({
	data,
}: {
	data: AdminDashboardSystemResType['data'];
}) {
	// State to track selected status (for interactive features)
	const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

	// Format number with commas as thousand separators
	const formatNumber = (num: number) => {
		return num.toLocaleString('vi-VN');
	};

	// Transform the data for the pie chart
	const orderStatusData = data.orders.byStatus.map((status) => ({
		name: status.statusName,
		value: status.count,
		statusType: status.statusType,
	}));

	// Assign colors based on status type
	const statusColors: Record<string, string> = {
		PENDING: 'yellow',
		CONFIRMED: 'blue',
		PROCESSING: 'indigo',
		SHIPPED: 'violet',
		DELIVERED: 'green',
		CANCELLED: 'red',
	};

	// Color mapping for the color dots
	const statusColorMap: Record<string, string> = {
		PENDING: 'bg-yellow-500',
		CONFIRMED: 'bg-blue-500',
		PROCESSING: 'bg-indigo-500',
		SHIPPED: 'bg-violet-500',
		DELIVERED: 'bg-green-500',
		CANCELLED: 'bg-red-500',
	};

	const getColorsByStatusType = () => {
		return data.orders.byStatus.map(
			(status) =>
				statusColors[status.statusType as keyof typeof statusColors] || 'gray'
		);
	};

	// Format for tooltip
	const valueFormatter = (value: number) => `${formatNumber(value)} đơn hàng`;

	// Handle pie chart selection
	const handleValueChange = (v: any) => {
		if (v) {
			const index = data.orders.byStatus.findIndex(
				(status) => status.statusName === v.categoryClicked
			);
			setSelectedStatus(index !== -1 ? index : null);
		} else {
			setSelectedStatus(null);
		}
	};

	// Calculate total
	const totalOrders = data.orders.total;

	// Get the selected status details
	const selectedStatusDetails =
		selectedStatus !== null ? data.orders.byStatus[selectedStatus] : null;

	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Biểu đồ trạng thái đơn hàng</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center space-y-4">
					<DonutChart
						data={orderStatusData}
						category="name"
						index="value"
						valueFormatter={valueFormatter}
						colors={getColorsByStatusType()}
						className="h-60 mt-4"
						onValueChange={handleValueChange}
						showLabel
						variant="pie"
					/>

					<div className="text-center mt-4">
						{selectedStatusDetails ? (
							<div className="space-y-1">
								<p className="text-sm font-medium">
									{selectedStatusDetails.statusName}
								</p>
								<p className="text-xl font-bold">
									{formatNumber(selectedStatusDetails.count)} đơn hàng
								</p>
								<p className="text-sm text-muted-foreground">
									{((selectedStatusDetails.count / totalOrders) * 100).toFixed(
										1
									)}
									% tổng số đơn hàng
								</p>
							</div>
						) : (
							<div className="space-y-1">
								<p className="text-sm font-medium">Tổng đơn hàng</p>
								<p className="text-xl font-bold">
									{formatNumber(totalOrders)} đơn hàng
								</p>
							</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-3 w-full mt-4">
						{data.orders.byStatus.map((status, index) => {
							const colorClass =
								statusColorMap[status.statusType] || 'bg-gray-500';

							return (
								<div
									key={index}
									className={cn(
										'flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors',
										selectedStatus === index
											? 'bg-gray-100 dark:bg-gray-800'
											: 'hover:bg-gray-50 dark:hover:bg-gray-900'
									)}
									onClick={() =>
										setSelectedStatus(selectedStatus === index ? null : index)
									}
								>
									<div className={cn('w-3 h-3 rounded-full', colorClass)} />
									<div className="flex flex-col">
										<span className="text-xs font-medium">
											{status.statusName}
										</span>
										<span className="text-xs text-muted-foreground">
											{formatNumber(status.count)}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default AdminDashboardPieChart;
