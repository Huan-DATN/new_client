'use client';

import orderRequest from '@/api/orderRequest';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { OrderStatusEnum } from '@/constants/orderStatusEnum';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const updateStatusSchema = z.object({
	statusId: z.number({
		required_error: 'Vui lòng chọn trạng thái',
	}),
});

type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;

type Status = {
	id: number;
	type: string;
	name: string;
};

interface UpdateStatusProps {
	id: number;
	currentStatus: Status;
	allStatuses: Status[];
}

function UpdateStatus({ id, currentStatus, allStatuses }: UpdateStatusProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Filter statuses based on current status
	const getNextPossibleStatuses = () => {
		const currentType = currentStatus.type as OrderStatusEnum;

		switch (currentType) {
			case OrderStatusEnum.PENDING:
				return allStatuses.filter((status) =>
					[OrderStatusEnum.CONFIRMED, OrderStatusEnum.CANCELLED].includes(
						status.type as OrderStatusEnum
					)
				);
			case OrderStatusEnum.CONFIRMED:
				return allStatuses.filter((status) =>
					[OrderStatusEnum.PROCESSING, OrderStatusEnum.CANCELLED].includes(
						status.type as OrderStatusEnum
					)
				);
			case OrderStatusEnum.PROCESSING:
				return allStatuses.filter((status) =>
					[OrderStatusEnum.SHIPPED].includes(status.type as OrderStatusEnum)
				);
			case OrderStatusEnum.SHIPPED:
				return allStatuses.filter((status) =>
					[OrderStatusEnum.DELIVERED].includes(status.type as OrderStatusEnum)
				);
			case OrderStatusEnum.DELIVERED:
				return allStatuses.filter((status) =>
					[OrderStatusEnum.RETURNED].includes(status.type as OrderStatusEnum)
				);
			default:
				return [];
		}
	};

	const availableStatuses = getNextPossibleStatuses();

	const form = useForm<UpdateStatusFormValues>({
		resolver: zodResolver(updateStatusSchema),
		defaultValues: {},
	});

	const onSubmit = async (values: UpdateStatusFormValues) => {
		setIsSubmitting(true);
		try {
			await orderRequest.updateOrderStatus(id, { statusId: values.statusId });
			toast({
				title: 'Cập nhật trạng thái thành công',
				description: 'Trạng thái đơn hàng đã được cập nhật',
			});
			router.refresh();
		} catch (error) {
			console.error(error);
			toast({
				title: 'Đã xảy ra lỗi',
				description: 'Không thể cập nhật trạng thái đơn hàng',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (availableStatuses.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">Cập nhật trạng thái</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="statusId"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Chọn trạng thái mới</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={(value: string) =>
												field.onChange(parseInt(value))
											}
											className="flex flex-col space-y-1"
										>
											{availableStatuses.map((status) => (
												<FormItem
													key={status.id}
													className="flex items-center space-x-3 space-y-0"
												>
													<FormControl>
														<RadioGroupItem value={status.id.toString()} />
													</FormControl>
													<FormLabel className="font-normal cursor-pointer">
														{status.name}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isSubmitting} className="w-full">
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Đang cập nhật...
								</>
							) : (
								'Cập nhật trạng thái'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default UpdateStatus;
