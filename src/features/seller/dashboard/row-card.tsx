'use client';
import { Ban, CheckCheck, DollarSign, Loader2, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import statisticRequest from '../../../api/statisticRequest';
import { StatisticDashboardResponseSchemaType } from '../../../schemaValidations/response/statistic';
import StatisticCard from './statistic-card';

const cards = [
	{
		icon: <DollarSign className="text-3xl text-green-600" />,
		title: 'Tổng tiền',
		value: '3.589.924.700 ₫',
		borderColor: 'border-green-300',
		bg: 'bg-green-50',
		statisticKey: 'totalRevenue',
	},
	{
		icon: <CheckCheck className="text-3xl text-blue-600" />,
		title: 'Hoàn thành',
		value: '2',
		borderColor: 'border-blue-300',
		bg: 'bg-blue-50',
		statisticKey: 'completedOrders',
	},
	{
		icon: <Truck className="text-3xl text-orange-600" />,
		title: 'Đang vận chuyển',
		value: '3',
		borderColor: 'border-orange-300',
		bg: 'bg-orange-50',
		statisticKey: 'shippingOrders',
	},
	{
		icon: <Ban className="text-3xl text-red-600" />,
		title: 'Bị huỷ',
		value: '0',
		borderColor: 'border-red-300',
		bg: 'bg-red-50',
		statisticKey: 'cancelledOrders',
	},
];

export default function RowCard({
	sessionToken,
}: {
	sessionToken: string;
}) {
	const [statisticDashboard, setStatisticDashboard] = useState<StatisticDashboardResponseSchemaType['data'] | null>(null);

	useEffect(() => {
		statisticRequest.getStatisticDashboard(sessionToken).then((res) => {
			setStatisticDashboard(res.payload.data);
		});
	}, [sessionToken]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 w-full">
			{statisticDashboard ? (
				cards.map((card, idx) => (
					<StatisticCard key={idx} card={{
						...card,
						value: statisticDashboard?.[card.statisticKey as keyof typeof statisticDashboard]?.value || card.value,
					}}/>
				))
			) : (
				<div className="col-span-4">
					<div className="flex justify-center items-center h-full">
						<Loader2 className="animate-spin" />
					</div>
				</div>
			)}
		</div>
	);
}
