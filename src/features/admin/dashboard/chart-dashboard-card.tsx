'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { AreaChart, BarChart, Card } from '@tremor/react';
import { useEffect, useState } from 'react';
import statisticRequest from '../../../api/statisticRequest';
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { StatisticResponseType } from '../../../schemaValidations/response/statistic';

export default function ChartDashboardCard({
	sessionToken,
}: {
	sessionToken: string;
}) {
	const [chartData, setChartData] = useState<
		StatisticResponseType['data'] | []
	>([]);

	useEffect(() => {
		statisticRequest
			.getStatistic(sessionToken, {
				month: new Date().getMonth(),
				year: new Date().getFullYear(),
			})
			.then((res) => {
				console.log(res.payload.data);
				setChartData(res.payload.data);
			});
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Phân tích bán hàng</CardTitle>
				<CardDescription>
					Biểu đồ về đơn hàng và doanh thu tháng gần đây
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="sales">
					<TabsList className="mb-4 justify-center">
						<TabsTrigger
							value="sales"
							className="border-2 border-gray-300 rounded-md"
						>
							Area Chart
						</TabsTrigger>
						<TabsTrigger
							value="orders"
							className="border-2 border-gray-300 rounded-md"
						>
							Bar Chart
						</TabsTrigger>
					</TabsList>
					<TabsContent value="sales" className="">
						<AreaChart
							className="h-72 w-full"
							data={chartData}
							index="date"
							categories={['revenue']}
							colors={['blue']}
						/>
					</TabsContent>
					<TabsContent value="orders">
						<BarChart
							className="h-72"
							data={chartData}
							index="date"
							categories={['revenue']}
							colors={['green']}
						/>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
