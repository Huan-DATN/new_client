import { Ban, CheckCheck, DollarSign, Truck } from 'lucide-react';
import StatisticCard from './statistic-card';

export default function RowCard() {
	const cards = [
		{
			icon: <DollarSign className="text-3xl text-green-600" />,
			title: 'Tổng tiền',
			value: '3.589.924.700 ₫',
			borderColor: 'border-green-300',
			bg: 'bg-green-50',
		},
		{
			icon: <CheckCheck className="text-3xl text-blue-600" />,
			title: 'Hoàn thành',
			value: '2',
			borderColor: 'border-blue-300',
			bg: 'bg-blue-50',
		},
		{
			icon: <Truck className="text-3xl text-orange-600" />,
			title: 'Đang vận chuyển',
			value: '3',
			borderColor: 'border-orange-300',
			bg: 'bg-orange-50',
		},
		{
			icon: <Ban className="text-3xl text-red-600" />,
			title: 'Bị huỷ',
			value: '0',
			borderColor: 'border-red-300',
			bg: 'bg-red-50',
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 w-full">
			{cards.map((card, idx) => (
				<StatisticCard key={idx} card={card} />
			))}
		</div>
	);
}
