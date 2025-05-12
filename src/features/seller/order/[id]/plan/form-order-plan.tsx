'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	OrderStatusEnum,
	OrderStatusPlanArray,
} from '@/constants/orderStatusEnum';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { cn } from '@/lib/utils';
import { getDate, setDate } from '@/redux/planOrder/planOrderReducer';
import { StatusListResType } from '@/schemaValidations/response/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { AlertTriangle, CalendarIcon, Check, Clock, Info, Loader2, PackageCheck, PackageOpen, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import orderRequest from '../../../../../api/orderRequest';
import { handleErrorApi } from '../../../../../lib/utils';
function FormOrderPlan({
	statuses,
	id,
	sessionToken,
}: {
	statuses: StatusListResType['data'];
	id: number;
	sessionToken: string;
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Filter statuses to only include those in the plan array
	const statusOptions = statuses
		.filter((status) =>
			OrderStatusPlanArray.includes(status.type as OrderStatusEnum)
		)
		.sort((a, b) => {
			// Sort by the order they appear in OrderStatusPlanArray
			const aIndex = OrderStatusPlanArray.indexOf(a.type as OrderStatusEnum);
			const bIndex = OrderStatusPlanArray.indexOf(b.type as OrderStatusEnum);
			return aIndex - bIndex;
		});

	const dispatch = useAppDispatch();
	const planOrder = useAppSelector((state) => state.planOrder);
	const router = useRouter();

	// Helper function to get status icon
	const getStatusIcon = (statusType: string) => {
		switch (statusType) {
			case OrderStatusEnum.CONFIRMED:
				return <Check className="h-5 w-5" />;
			case OrderStatusEnum.PROCESSING:
				return <PackageOpen className="h-5 w-5" />;
			case OrderStatusEnum.SHIPPED:
				return <Truck className="h-5 w-5" />;
			default:
				return <Info className="h-5 w-5" />;
		}
	};

	const handleDateChange = (statusId: number, date: Date | undefined) => {
		if (date) {
			dispatch(setDate({ statusId, date: date.toISOString() }));
		}
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);

			// Validate that all statuses have dates
			const missingDates = statusOptions.filter(
				status => !getDate(planOrder, status.id)
			);

			if (missingDates.length > 0) {
				toast.error('Vui lòng chọn ngày cho tất cả các trạng thái');
				setIsSubmitting(false);
				return;
			}

			// Create plan data
			const planOrderData = statusOptions.map(status => ({
				statusId: status.id,
				date: new Date(getDate(planOrder, status.id) || new Date()),
			}));

			await orderRequest.createPlan(sessionToken, id, planOrderData);
			toast.success('Lập kế hoạch đơn hàng thành công');
			router.push(`/seller/order/${id}`);
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		console.log(statuses);
		console.log(statusOptions);
	}, [statusOptions]);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<PackageCheck className="h-5 w-5 text-primary" />
					Lập kế hoạch xử lý đơn hàng
				</CardTitle>
				<CardDescription>
					Thiết lập lịch trình dự kiến cho từng bước xử lý đơn hàng. Khách hàng sẽ được thông báo về lịch trình này.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="rounded-md border p-4 bg-muted/30">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<AlertTriangle className="h-4 w-4 text-amber-500" />
						<p>Sau khi lưu kế hoạch, trạng thái đơn hàng sẽ được cập nhật thành "Đã xác nhận"</p>
					</div>
				</div>

				<div className="grid gap-6">
					{statusOptions.map((status) => (
						<div
							key={status.id}
							className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-md hover:border-primary/50 transition-colors"
						>
							<div className="flex-shrink-0 p-2 rounded-full bg-primary/10 text-primary">
								{getStatusIcon(status.type)}
							</div>

							<div className="flex-1">
								<h3 className="font-medium text-base mb-1">{status.name}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{status.type === OrderStatusEnum.CONFIRMED && 'Xác nhận và bắt đầu chuẩn bị đơn hàng của khách hàng'}
									{status.type === OrderStatusEnum.PROCESSING && 'Đóng gói và chuẩn bị sản phẩm để giao hàng'}
									{status.type === OrderStatusEnum.SHIPPED && 'Bàn giao đơn hàng cho đơn vị vận chuyển'}
								</p>

								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">Dự kiến hoàn thành vào:</span>
								</div>

								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												"w-full justify-start text-left font-normal mt-1",
												!getDate(planOrder, status.id) && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{getDate(planOrder, status.id) ? (
												format(new Date(getDate(planOrder, status.id) as string), 'PPP', { locale: vi })
											) : (
												<span>Chọn ngày</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={getDate(planOrder, status.id) ? new Date(getDate(planOrder, status.id) as string) : undefined}
											onSelect={(date) => handleDateChange(status.id, date)}
											initialFocus
											disabled={(date: Date) => date < new Date()}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="flex justify-between pt-2">
				<Button
					variant="outline"
					onClick={() => router.back()}
				>
					Hủy
				</Button>
				<Button
					onClick={handleSubmit}
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Đang xử lý...
						</>
					) : (
						<>
							Lưu kế hoạch
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default FormOrderPlan;
