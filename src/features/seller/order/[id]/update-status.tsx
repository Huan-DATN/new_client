'use client';
import orderRequest from '@/api/orderRequest';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { handleErrorApi } from '@/lib/utils';
import {
	AlertCircle,
	Check,
	CheckCircle,
	Clock,
	Package,
	ShoppingBag,
	Truck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import OrderStatusBadge from './order-status-badge';

interface StatusProgressStep {
	id: number;
	type: OrderStatusEnum;
	name: string;
	description: string;
	icon: JSX.Element;
	color: string;
}

interface UpdateStatusProps {
	id: number;
	currentStatus: {
		id: number;
		type: string;
		name: string;
	};
	allStatuses: Array<{
		id: number;
		type: string;
		name: string;
	}>;
}

function UpdateStatus({ id, currentStatus, allStatuses }: UpdateStatusProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [currentStatusId, setCurrentStatusId] = useState(currentStatus.id);

	// Define the status sequence for visual progress
	const statusSequence = [
		OrderStatusEnum.PENDING,
		OrderStatusEnum.CONFIRMED,
		OrderStatusEnum.PROCESSING,
		OrderStatusEnum.SHIPPED,
		OrderStatusEnum.DELIVERED,
	];

	// Create a mapping of all statuses by type
	const statusesByType = allStatuses.reduce((acc, status) => {
		acc[status.type] = status;
		return acc;
	}, {} as Record<string, any>);

	// Get the position of current status in sequence
	const currentStep = statusSequence.indexOf(
		currentStatus.type as OrderStatusEnum
	);

	// Next status in sequence logic
	const getNextStatus = () => {
		if (currentStep < statusSequence.length - 1) {
			const nextStatusType = statusSequence[currentStep + 1];
			return statusesByType[nextStatusType];
		}
		return null;
	};

	const nextStatus = getNextStatus();

	// Handle status update
	const handleUpdateStatus = async () => {
		if (!nextStatus) return;

		try {
			setLoading(true);
			await orderRequest.updateOrderStatus(id, { statusId: nextStatus.id });
			setCurrentStatusId(nextStatus.id);
			toast.success(`Đơn hàng đã được cập nhật thành "${nextStatus.name}"`);
			router.refresh();
		} catch (error) {
			handleErrorApi({ error });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log(currentStatus);
	}, [currentStatus]);

	// Handle order completion
	const handleCompleteOrder = async () => {
		try {
			setLoading(true);
			await orderRequest.completeOrder(id);
			toast.success('Đơn hàng đã hoàn thành thành công');
			router.refresh();
		} catch (error) {
			handleErrorApi({ error });
		} finally {
			setLoading(false);
		}
	};

	// Helper to get status icon
	const getStatusIcon = (type: string) => {
		switch (type) {
			case OrderStatusEnum.CONFIRMED:
				return <Check className="h-5 w-5" />;
			case OrderStatusEnum.PROCESSING:
				return <Package className="h-5 w-5" />;
			case OrderStatusEnum.SHIPPED:
				return <Truck className="h-5 w-5" />;
			case OrderStatusEnum.DELIVERED:
				return <CheckCircle className="h-5 w-5" />;
			default:
				return <ShoppingBag className="h-5 w-5" />;
		}
	};

	// Check if current status is SHIPPED (for complete button)
	const canCompleteDirectly = currentStatus.type === 'SHIPPED';

	// Progress steps for visualization
	const progressSteps = statusSequence.map((type, index) => {
		const step = statusesByType[type] || { id: index, type, name: type };
		return {
			...step,
			isActive: currentStep >= index,
			isCompleted: currentStep > index,
		};
	});

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg flex items-center gap-2">
					<Clock className="h-5 w-5 text-primary" />
					Cập nhật trạng thái đơn hàng
				</CardTitle>
				<CardDescription>
					Theo dõi và cập nhật trạng thái của đơn hàng trong quá trình xử lý
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Status Progress Visualization */}
				<div className="relative">
					{/* Timeline connector line */}
					<div className="absolute top-6 left-6 h-full w-0.5 bg-gray-200"></div>

					{/* Status steps */}
					<div className="space-y-6">
						{progressSteps.map((step, index) => (
							<div key={index} className="flex items-start gap-3">
								<div
									className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
										step.isActive ? 'bg-primary text-white' : 'bg-gray-200'
									} transition-colors duration-300`}
								>
									{getStatusIcon(step.type)}
								</div>
								<div className="flex flex-col gap-1 mt-1">
									<OrderStatusBadge status={step} size="sm" />
									<p className="text-sm text-muted-foreground">
										{step.type === OrderStatusEnum.PENDING &&
											'Đơn hàng đang chờ xác nhận'}
										{step.type === OrderStatusEnum.CONFIRMED &&
											'Đơn hàng đã được xác nhận'}
										{step.type === OrderStatusEnum.PROCESSING &&
											'Đang chuẩn bị đơn hàng'}
										{step.type === OrderStatusEnum.SHIPPED &&
											'Đơn hàng đang được giao'}
										{step.type === OrderStatusEnum.DELIVERED &&
											'Đơn hàng đã giao thành công'}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Current Status */}
				<div className="rounded-md border p-4 bg-muted/20">
					<div className="flex items-center gap-2 text-sm">
						<AlertCircle className="h-4 w-4 text-amber-500" />
						<p className="font-medium">
							Trạng thái hiện tại:{' '}
							<span className="font-semibold text-primary">
								{currentStatus.name}
							</span>
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default UpdateStatus;
