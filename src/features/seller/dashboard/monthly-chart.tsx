'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import statisticRequest from '../../../api/statisticRequest';
import { LineChart } from '../../../components/ui/line-chart';
import { MonthlyStatisticsResponseType } from '../../../schemaValidations/response/statistic';

export default function MonthlyChart({
	sessionToken,
	month = new Date().getMonth(),
	year = new Date().getFullYear(),
}: {
	sessionToken: string;
	month?: number;
	year?: number;
}) {
	const [chartData, setChartData] = useState<
		MonthlyStatisticsResponseType['data'] | []
	>([]);
	const [loading, setLoading] = useState(true);

	const monthNames = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	];

	useEffect(() => {
		setLoading(true);
		statisticRequest
			.getMonthlyStatistics(sessionToken, { month, year })
			.then((res) => {
				setChartData(res.payload.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [sessionToken, month, year]);

	return (
		<Card className="h-full">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-medium">
					Thống kê theo tháng
				</CardTitle>
				<CardDescription>
					Doanh thu theo ngày trong {monthNames[month]} năm {year}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					</div>
				) : (
					<LineChart
						className="h-64"
						data={chartData}
						index="date"
						categories={['Doanh thu']}
						valueFormatter={(value) => `${value.toLocaleString()}`}
						connectNulls
						yAxisWidth={100}
					/>
				)}
			</CardContent>
		</Card>
	);
}
