function StatisticCard({
	card,
}: {
	card: {
		title: string;
		value: any;
		icon: JSX.Element;
		borderColor: string;
		bg: string;
	};
}) {
	return (
		<div
			className={`flex items-center p-4 border ${card.borderColor} rounded-md ${card.bg} shadow-sm`}
		>
			<div className="mr-4">{card.icon}</div>
			<div>
				<div className="text-xl font-bold">{card.value}</div>
				<div className="text-sm text-gray-600">{card.title}</div>
			</div>
		</div>
	);
}

export default StatisticCard;
