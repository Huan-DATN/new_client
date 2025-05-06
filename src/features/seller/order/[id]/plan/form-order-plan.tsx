'use client';
import {
	OrderStatusEnum,
	OrderStatusPlanArray,
} from '@/constants/orderStatusEnum';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getDate, setDate } from '@/redux/planOrder/planOrderReducer';
import { StatusListResType } from '@/schemaValidations/response/common';
import { useRouter } from 'next/navigation';
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
	const statusOptions = statuses
		.filter((status) =>
			OrderStatusPlanArray.includes(status.name as OrderStatusEnum)
		)
		.map((status) => ({
			label: status.name,
			value: status.id,
		}));

	const dispatch = useAppDispatch();
	const planOrder = useAppSelector((state) => state.planOrder);

	const router = useRouter();

	const handleDateChange = (statusId: number, date: string) => {
		console.log(statusId, date);
		dispatch(setDate({ statusId, date }));
	};

	const handleSubmit = async () => {
		const planOrderData = planOrder.map((item) => ({
			statusId: item!.statusId,
			date: new Date(item!.date),
		}));

		try {
			await orderRequest.createPlan(sessionToken, id, planOrderData);

			router.push(`/seller/order/${id}`);
			router.refresh();
		} catch (error) {
			handleErrorApi({
				error,
			});
		}
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-bold text-gray-800">Lập kế hoạch đơn hàng</h2>
			<p className="text-sm text-gray-600">
				Chọn trạng thái và ngày cho từng trạng thái trong kế hoạch đơn hàng của
				bạn. Bạn có thể thêm nhiều trạng thái khác nhau với các ngày khác nhau.
			</p>
			<div className="flex flex-col gap-6">
				{statusOptions.map((item, index) => (
					<div
						key={index}
						className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
					>
						<div className="flex-1">
							<label
								htmlFor={`status-${item.value}`}
								className="block text-sm font-medium text-gray-700"
							>
								Trạng thái
							</label>
							<select
								id={`status-${item.value}`}
								value={item.value}
								className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
							>
								{statusOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						<div className="flex-1">
							<label
								htmlFor={`date-${item.value}`}
								className="block text-sm font-medium text-gray-700"
							>
								Ngày
							</label>
							<input
								id={`date-${item.value}`}
								type="date"
								defaultValue={getDate(planOrder, item.value) || ''}
								className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) => {
									const dateValue = new Date(e.target.value);
									if (!isNaN(dateValue.getTime())) {
										handleDateChange(item.value, dateValue.toISOString());
									} else {
										console.error('Invalid date selected');
									}
								}}
							/>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-end">
				<button
					type="button"
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 transition"
					onClick={handleSubmit}
				>
					Lưu kế hoạch
				</button>
			</div>
		</div>
	);
}

export default FormOrderPlan;
